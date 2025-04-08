"use client";
import { useRef, useState } from "react";

import Button from "@/components/ui/Button";
import useStore from "@/store";

import type { QueryExecResult } from "sql.js";

export type DatabaseExecResult = null | QueryExecResult[] | undefined;

/**
 * Renders a single value of the array returned by db.exec(...) as a table
 */
const ResultTable = ({ columns, values }: QueryExecResult) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((columnName) => (
            <td className="border bg-gray-100 px-1 py-2" key={columnName}>
              <strong>{columnName}</strong>
            </td>
          ))}
        </tr>
      </thead>

      <tbody>
        {values.map(
          (
            row, // values is an array of arrays representing the results of the query
            rowIndex,
          ) => (
            <tr key={rowIndex}>
              {row.map((value, cellIndex) => (
                <td className="border p-2" key={cellIndex}>
                  {value}
                </td>
              ))}
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};

export default function SqlJsPage() {
  const tc = useStore((state) => state.treeClient);
  const [queryResults, setQueryResults] = useState<DatabaseExecResult>(null);
  const [queryString, setQueryString] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  const ref = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className="grid h-full grid-rows-[50px_200px_50px_auto] p-5">
      <h1>Tree-App SQL interpreter</h1>
      <textarea
        className="my-2 h-48 w-full p-2"
        onChange={(e) => {
          setQueryString(e.target.value);
        }}
        placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
        ref={ref}
        value={queryString}
      />
      <div className="flex gap-6">
        <Button
          className="mb-2"
          disabled={queryString === ""}
          onClick={() => {
            const { data: results, error: err } =
              tc.executeQuery<QueryExecResult>(queryString, true);
            setQueryResults(results);
            setError(err);
          }}
        >
          Execute
        </Button>

        <Button
          className="mb-2"
          disabled={!queryResults && !queryString}
          onClick={() => {
            tc.executeQuery<QueryExecResult>("", true);
            setQueryString("");
            setQueryResults(null);
            setError(null);
            ref.current?.focus();
          }}
        >
          Clear
        </Button>

        <Button
          className="mb-2"
          onClick={() => {
            const { data: results } = tc.executeQuery<QueryExecResult>(
              "select * from sqlite_master",
              true,
            );
            setQueryResults(results);
          }}
        >
          Get all tables
        </Button>
      </div>
      {error && (
        <pre className="py-4 text-red-600">{(error ?? "").toString()}</pre>
      )}
      <pre className="w-full overflow-y-auto">
        {queryResults
          ? queryResults.map((execResult: QueryExecResult, rIndex: number) => (
              <ResultTable
                columns={execResult.columns}
                key={rIndex}
                values={execResult.values}
              />
            ))
          : ""}
      </pre>
    </div>
  );
}
