wget "https://data.geo.admin.ch/ch.bafu.wald-vegetationshoehenstufen_1995/data.zip" -O "vegetationshoehenstufen_1995.zip"
7z x -aoa -o"vegetationshoehenstufen_1995" "vegetationshoehenstufen_1995.zip"
7z x -aoa -o"vegetationshoehenstufen_1995" "vegetationshoehenstufen_1995/Vegetationshoehenstufen_1995.zip"
rm "vegetationshoehenstufen_1995.zip" "vegetationshoehenstufen_1995/Vegetationshoehenstufen_1995.zip"
cd vegetationshoehenstufen_1995 && rename 's/Vegetationshhenstufen_1995/vegetationshoehenstufen_1995/' Vegetationshhenstufen_1995.*