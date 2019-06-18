ffmpeg -i frames/dragon%d.bmp  -i a.mp3 -map 0:v -map 1:a -c:v libx264 -r 18 -shortest -y -pix_fmt yuv420p out.mp4
