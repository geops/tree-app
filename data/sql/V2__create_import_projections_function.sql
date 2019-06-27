CREATE FUNCTION import_projections() RETURNS integer AS $$
DECLARE x integer;
BEGIN
  TRUNCATE projections_import;
  COPY projections_import FROM '/data/projections.csv' DELIMITER ';' CSV HEADER;
  GET DIAGNOSTICS x = ROW_COUNT;
  RETURN x;
END;
$$ LANGUAGE plpgsql;