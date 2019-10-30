
CREATE TABLE recommendations_export (foresttype TEXT, treetype treetype,
                                                      recommendationtype recommendationtype);


INSERT INTO recommendations_export (foresttype, treetype, recommendationtype)
SELECT DISTINCT trim(both
                     from naistyp_c) AS foresttype,
                sisf_nr::int::text::treetype,
                vorh::recommendationtype
FROM nat_naistyp_art
WHERE art = 'B'
UNION
SELECT DISTINCT trim(both
                     from naistyp) AS foresttype,
                sisf_nr::int::text::treetype,
                CASE vorh
                    WHEN 'a' THEN '1'::recommendationtype
                    WHEN 'b' THEN '2'::recommendationtype
                    WHEN 'c' THEN '3'::recommendationtype
                    ELSE null
                END AS recommendationtype
FROM nat_baum_collin
WHERE sisf_nr::int::text::name = any(enum_range(null::treetype)::name[]);

COPY
        (WITH one AS
                 (SELECT foresttype,
                         json_agg(treetype::text::int
                                  ORDER BY treetype) treetypes
                  FROM recommendations_export
                  WHERE recommendationtype = '1'
                  GROUP BY foresttype),
              two AS
                 (SELECT foresttype,
                         json_agg(treetype::text::int
                                  ORDER BY treetype) treetypes
                  FROM recommendations_export
                  WHERE recommendationtype = '2'
                  GROUP BY foresttype),
              three AS
                 (SELECT foresttype,
                         json_agg(treetype::text::int
                                  ORDER BY treetype) treetypes
                  FROM recommendations_export
                  WHERE recommendationtype = '3'
                  GROUP BY foresttype),
              four AS
                 (SELECT foresttype,
                         json_agg(treetype::text::int
                                  ORDER BY treetype) treetypes
                  FROM recommendations_export
                  WHERE treetype = '9500'
                  GROUP BY foresttype) SELECT json_object_agg(foresttype,json_build_array(coalesce(one.treetypes,'[]'::json),coalesce(two.treetypes,'[]'::json),coalesce(three.treetypes,'[]'::json),coalesce(four.treetypes,'[]'::json))) AS recommendations
         FROM
                 (SELECT DISTINCT foresttype
                  FROM recommendations_export) foo
         LEFT JOIN one USING (foresttype)
         LEFT JOIN two USING (foresttype)
         LEFT JOIN three USING (foresttype)
         LEFT JOIN four USING (foresttype)) TO '/data/recommendations.json';