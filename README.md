# SurfaceMatch
ROSを入れるとOpenCV3およびContribライブラリが
~~~
/opt/ros/kinetic/lib
~~~
にインストールされる。ContribのSurfaceMatchも即テストできる。

## アプリのビルド
cmakeがOpenCVのインストール先を探すが、OpenCV_DIRで明示することもできる。
~~~
cmake .
make
~~~
## モデルの教示
3DCADデータからモデルを教示する？
~~~
ppf_match_3d::PPF3DDetector detector(0.03, 0.05);
detector.trainModel(pc);
~~~
Mat pcは6列N行の行列で、点の座標とその点の法線ベクトルからなる
~~~
 x,y,z,nx,ny,nz
~~~
サンプルはPLYファイルから読み込むが、これなら直接Matを作れる。
