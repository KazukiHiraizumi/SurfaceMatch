#include <opencv2/surface_matching.hpp>
#include <iostream>
#include <opencv2/surface_matching/ppf_helpers.hpp>
#include <opencv2/core/utility.hpp>

using namespace std;
using namespace cv;
using namespace ppf_match_3d;

int main(int argc, char** argv){   
	Mat pc=loadPLYSimple(argv[1],0);
	for(int i=0;i<pc.rows;i++){
		cout<<i<<") "<<pc.row(i)<<"\n";
	}
}