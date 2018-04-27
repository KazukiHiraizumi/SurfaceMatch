# SurfaceMatch
Testing OpenCV-Contrib SurfaceMatch

## OpenCV-Contribビルド
- 本体ソースを取得
~~~
git clone https://github.com/opencv/opencv.git
cd opencv 
git checkout 3.3.1 
cd ..
~~~
- contribソースを取得
~~~
git clone https://github.com/opencv/opencv_contrib.git
cd opencv_contrib
git checkout 3.3.1
cd ..
~~~
- cmake
~~~
cd opencv
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local -D WITH_TBB=ON -D WITH_QT=ON -D WITH_OPENGL=ON -D OPENCV_EXTRA_MODULES_PATH=../../opencv_contrib/modules -D BUILD_EXAMPLES=ON ..
~~~
!! CUDAがない時は
 WITH_CUDA=OFF マクロを追加

- compile
nprocでコア数を確認。4コアなら
~~~
make -j4
~~~
- install
~~~
sudo make install
sudo sh -c 'echo "/usr/local/lib" >> /etc/ld.so.conf.d/opencv.conf'
sudo ldconfig
~~~
!! /usr/local/lib以外へインストールするときは
例えばROSだと
~~~
cmake ... -D CMAKE_INSTALL_PREFIX=/opt/ros/kinetic ...
sudo sh -c 'echo "/opt/ros/kinetic/lib" >> /etc/ld.so.conf.d/opencv.conf
~~~
## アプリのビルド
cmakeがOpenCVのインストール先を探すが、OpenCV_DIRで明示することもできる。
~~~
OpenCV_DIR=/opt/ros/kinetic cmake .
~~~
## モデルの教示
3DCADデータからモデルを教示する？
~~~
ppf_match_3d::PPF3DDetector detector(0.03, 0.05);
detector.trainModel(pc);
~~~
Mat pcは6列N行の行列で、点の座標とその点の法線ベクトルからなる
~~~
 x,y,z,N<sub>x</sub>,N<sub>y</sub>,N<sub>z</sub>
~~~
サンプルはPLYファイルから読み込むが、これなら直接Matを作れる。
