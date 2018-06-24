#include <opencv2/surface_matching.hpp>
#include <iostream>
#include <opencv2/surface_matching/ppf_helpers.hpp>
#include <opencv2/core/utility.hpp>

using namespace std;
using namespace cv;
using namespace ppf_match_3d;


class YPPF:public ppf_match_3d::PPF3DDetector{
public:
	YPPF(double a,double b):ppf_match_3d::PPF3DDetector(a,b){}
	Mat pcl(){
		cout << "num_ref_points=" <<num_ref_points;
		return sampled_pc;
	}
};

int main(int argc, char** argv){
	Mat pc=loadPLYSimple("model-2.ply",0);
//	for(int i=0;i<pc.rows;i++){
//		cout<<i<<") "<<pc.row(i)<<"\n";
//	}
	cout << "Training..." << endl;
	YPPF detector(0.025, 0.05);
	detector.trainModel(pc);
//	cout << detector.pcl();
	ppf_match_3d::writePLY(detector.pcl(), "model-ip.ply");
	cout << "    End" << endl;
/*	cout << "Loading scenary..." << endl;
	Mat pcTest = loadPLYSimple("scene.ply",0);
	cout << "    End" << endl;
	cout << "Starting matching..." << endl;
	vector<Pose3DPtr> results;
	detector.match(pcTest, results, 0.005, 0.01);
	cout << "    End" << endl;
	int N = 2;
	vector<Pose3DPtr> resultsSub(results.begin(),results.begin()+N);
// Create an instance of ICP
   ICP icp(100, 0.005f, 2.5f, 8);
   int64 t1 = cv::getTickCount();
    
// Register for all selected poses
   cout << endl << "Performing ICP on " << N << " poses..." << endl;
   icp.registerModelToScene(pc, pcTest, resultsSub);
   int64 t2 = cv::getTickCount();
    
   cout << endl << "ICP Elapsed Time " <<
(t2-t1)/cv::getTickFrequency() << " sec" << endl;
         
    cout << "Poses: " << endl;
    // debug first five poses
    for (size_t i=0; i<resultsSub.size(); i++)
    {
        Pose3DPtr result = resultsSub[i];
        cout << "Pose Result " << i << endl;
        result->printPose();
        if (i==0)
        {
            Mat pct = transformPCPose(pc, result->pose);
            writePLY(pct, "para6700PCTrans.ply");
        }
    }
 */
	return 0;
}