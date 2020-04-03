for file in ./NAT_*.csv
do
    iconv -f ISO-8859-1 -t UTF-8 "$file" >"$file.new" &&
    mv -f "$file.new" "$file"
done