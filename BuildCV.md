# OpenCV-Contribビルド
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
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/opt/ros/kinetic -D WITH_TBB=ON -D WITH_QT=OFF -D WITH_OPENGL=ON -D WITH_CUDA=OFF -D OPENCV_EXTRA_MODULES_PATH=../../opencv_contrib/modules -D BUILD_EXAMPLES=OFF ..
~~~
-D WITH_????のところは必要なものやプリインストされているソフトウェアに応じて変える  
例えばCUDAを使う(OpenCL)ならWITH_CUDA=ON  
CMakeList.txtに一覧がある。

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
# アプリのビルド
cmakeがOpenCVのインストール先を探すが、OpenCV_DIRで明示することもできる。
~~~
cmake .
~~~
