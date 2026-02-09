import difference from "lodash.difference";
import intersection from "lodash.intersection";
import union from "lodash.union";
import initSqlJs, { Database } from "sql.js";

import {
  AltitudinalZone,
  ForestType,
  Location,
  ProjectOptions,
  Recommendation,
  SilverFirArea,
  TreeAppProfile,
  TreeType,
  VegetationInfo,
} from "../types";
import {
  primaryProjectionFields as primaryFields,
  sortOptions,
} from "../utils";

import executeQuery from "./executeQuery";
import getDataWithFallback from "./getDataWithFallback";
import getForestTypeByCode from "./getForestTypeByCode";
import locate from "./locate";
import project from "./project";
import recommend from "./recommend";
import reduceProjections from "./reduceProjections";

type CustomEventCallback = (data: TreeClient) => void;

interface TypesRecord extends Record<string, string> {
  code: string;
}

type ArrayValue<T> = T[keyof T] extends (infer U)[] ? U : never;

class TreeClient {
  private dbFilePath: string;
  private eventListeners: Record<string, CustomEventCallback[]> = {};
  private wasmFilePath: string;
  public db: Database | null;
  public executeQuery: <T>(
    query: string,
    raw?: boolean,
  ) => { data: T[]; error: null | string };
  public getDataWithFallback: typeof getDataWithFallback;
  public getForestTypeByCode: typeof getForestTypeByCode;
  public locate: typeof locate;
  public project: typeof project;
  public recommend: typeof recommend;
  public reduceProjections: typeof reduceProjections;

  constructor(
    options: { dbFilePath: string; wasmFilePath: string } = {
      dbFilePath: "./data/tree.sqlite",
      wasmFilePath: "./data/sql-wasm.wasm",
    },
  ) {
    this.dbFilePath = options.dbFilePath;
    this.wasmFilePath = options.wasmFilePath;
    this.db = null;
    this.executeQuery = executeQuery.bind(this) as <T>(
      query: string,
      raw?: boolean,
    ) => { data: T[]; error: null | string };
    this.getForestTypeByCode = getForestTypeByCode.bind(
      this,
    ) as typeof getForestTypeByCode;
    this.getDataWithFallback = getDataWithFallback.bind(
      this,
    ) as typeof getDataWithFallback;
    this.reduceProjections = reduceProjections.bind(this);
    this.getSilverFirAreaByCode = this.getSilverFirAreaByCode.bind(this);
    this.getAltitudinalZones = this.getAltitudinalZones.bind(this);
    this.getProjections = this.getProjections.bind(this);
    this.project = project.bind(this);
    this.locate = locate.bind(this);
    this.getProjectionOptions = this.getProjectionOptions.bind(this);
    this.getField = this.getField.bind(this);
    this.getVegetation = this.getVegetation.bind(this);
    this.getVegetationList = this.getVegetationList.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
    this.getTypes = this.getTypes.bind(this);
    this.load().catch(console.error);
    this.recommend = recommend.bind(this);
  }

  static createFilterString(filters: Record<string, string> = {}): string {
    return Object.keys(filters).reduce((acc, key, idx) => {
      if (filters[key]) {
        return `${acc} ${idx === 0 ? "where" : "and"} ${key} ${filters[key]}`;
      }
      return acc;
    }, "");
  }

  static getProfilePrefix(profile?: TreeAppProfile): string {
    return profile === "ch" ? "" : `${profile}_`;
  }

  // Method to emit an event
  public emit(eventName: string, data: TreeClient): void {
    const listeners = this.eventListeners[eventName];
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }

  public getAltitudinalZones(): AltitudinalZone[] {
    const { data: altitudinalZones } = this.executeQuery<AltitudinalZone>(
      `select * from altitudinalzone`,
    );
    return altitudinalZones;
  }

  public getField(
    field: (typeof primaryFields)[number],
    location: Location,
  ): { field: string; value: Location[keyof Location]; values: TypesRecord[] } {
    const lcField = field.toLowerCase();
    const { data: types } = this.executeQuery<TypesRecord>(
      `select * from ${lcField}`,
    );
    return {
      field: field,
      value: location[field as keyof Location] ?? "",
      values: types ?? [],
    };
  }

  public getProjectionOptions(
    queryString: string,
    fieldName: string,
  ): ArrayValue<ProjectOptions> {
    const { data: options } = this.executeQuery<TypesRecord>(queryString);

    // @ts-expect-error dev
    return options
      ?.map((option) => option[fieldName.toLowerCase()])
      .sort(sortOptions);
  }

  // public getForestTypeByCode: <T>(code: string, fields?: string[], profile?: "" | TreeAppProfile) => T;

  public getProjections(
    fields: string[] = ["*"],
    filters: Record<string, string> = {},
  ) {
    let queryString = `select ${fields.join(", ")} from projections`;
    if (Object.keys(filters).length > 0) {
      queryString = queryString + " " + TreeClient.createFilterString(filters);
    }
    const { data: projections } = this.executeQuery(queryString);
    return projections;
  }

  public getRecommendations(forestType: string, profile?: TreeAppProfile): number[][] {
    const recommendationTableName = this.executeQuery<{ name: string }>(`SELECT name 
      FROM sqlite_master 
      WHERE type='table' AND name='${profile}_recommendations';`)?.data?.[0]?.name || "recommendations";

    const emptyLists = [[], [], [], []];
    const { data: lists } = this.executeQuery<Recommendation>(
      `select * from ${recommendationTableName} where foresttype = '${forestType}'`,
    );
    return [...(lists?.[0]?.recommendations ?? emptyLists)];
  }

  public getSilverFirAreaByCode(
    code: string,
    fields: string[] = ["*"],
  ): null | SilverFirArea {
    const { data: silverFirArea } = this.executeQuery<SilverFirArea>(
      `select ${fields.join(", ")} from silverfirarea where code = '${code}'`,
    );
    return silverFirArea?.[0] ?? null;
  }

  public getTypes<T>(
    table = "foresttype",
    fields: string[] = ["*"],
    filters: Record<string, string> = {},
    queryTail = "",
  ) {
    let queryString = `select ${fields.join(", ")} from ${table}`;
    if (Object.keys(filters).length > 0) {
      queryString = queryString + " " + TreeClient.createFilterString(filters);
    }
    const { data: forestTypes } = this.executeQuery<T>(
      queryString + ` ${queryTail}`,
    );
    return forestTypes;
  }

  public getVegetation(location: { forestType: string }): VegetationInfo {
    const { forestType } = location;

    if (!forestType) {
      throw new Error(`forestType is missing`);
    }

    if (!this.getForestTypeByCode<ForestType>(forestType)) {
      throw new Error(`${forestType} is not valid`);
    }

    const emptyInfo: VegetationInfo = {
      bush: [[], []],
      herb: [[], []],
      moss: [[], []],
    };
    const { data: vegetationInfo } = this.executeQuery<VegetationInfo>(
      `select * from vegetation where code = '${forestType}'`,
    );
    return vegetationInfo?.[0] ?? emptyInfo;
  }

  public getVegetationList(
    location: { forestType?: string; transitionForestType?: string } = {},
    mergeLevel4 = false,
    profile?: TreeAppProfile,
  ) {
    const { forestType, transitionForestType } = location;
    if (!forestType) {
      throw new Error(`forestType is missing`);
    }

    if (!this.getForestTypeByCode<ForestType>(forestType)) {
      throw new Error(`${forestType} is not valid`);
    }

    const lists = this.getRecommendations(forestType, profile);

    if (transitionForestType) {
      if (!this.getForestTypeByCode<ForestType>(forestType)) {
        throw new Error(`${transitionForestType} is not valid`);
      }

      const [lists0, lists1, lists2, lists3] = lists;
      const transitionLists = this.getRecommendations(transitionForestType, profile);

      lists[0] = union(
        intersection(lists0, transitionLists[0]),
        intersection(lists0, transitionLists[1]),
      );

      lists[1] = union(
        intersection(lists0, transitionLists[2]),
        intersection(lists1, transitionLists[0]),
        intersection(lists1, transitionLists[1]),
        intersection(lists1, transitionLists[2]),
        intersection(lists2, transitionLists[0]),
      );

      lists[2] = union(
        difference(transitionLists[0], lists.flat()),
        intersection(lists2, transitionLists[1]),
        intersection(lists2, transitionLists[2]),
      );

      lists[3] = union(lists3, transitionLists[3]);
    }

    if (mergeLevel4) {
      lists[2] = union(lists[2], lists[3]);
      lists[3] = [];
    }

    return this.sortTreeTypes(lists);
  }

  public async load() {
    console.log("Initialising database");

    const fileBuffer = await fetch(this.dbFilePath).then((res) =>
      res.arrayBuffer(),
    );

    await (
      initSqlJs as (config: {
        locateFile: () => string;
      }) => Promise<{ Database: new (data?: Uint8Array) => Database }>
    )({
      locateFile: () => this.wasmFilePath,
    }).then((SQL) => {
      this.db = new SQL.Database(new Uint8Array(fileBuffer));
      console.log("Database initialised");
      this.emit("load", this);
    });
  }

  public off(eventName: string, callback: CustomEventCallback): void {
    const listeners = this.eventListeners[eventName];
    if (listeners) {
      this.eventListeners[eventName] = listeners.filter(
        (listener) => listener !== callback,
      );
    }
  }

  public on(eventName: string, callback: CustomEventCallback): void {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
  }

  sortTreeTypes(lists: number[][]): number[][] {
    const treeTypes = this.getTypes<TreeType>("treetype");
    const nonresidents = (code: number) =>
      treeTypes.find((tt) => tt.code === code)?.nonresident;
    const residents = (code: number) =>
      !treeTypes.find((tt) => tt.code === code)?.nonresident;
    return lists.map((trees) =>
      trees
        .sort((a, b) => a - b) // by number
        .filter(residents)
        .concat(trees.filter(nonresidents)),
    );
  }
}

export default TreeClient;
