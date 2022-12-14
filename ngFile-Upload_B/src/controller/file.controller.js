const uploadFile = require('../middleware/upload')
const fs = require('fs')


// const upload = async (req, res) => {
//     try{
//         await uploadFile(req, res);

//         if(req, res == undefined){
//            return res.status(400).send({messsage: "Please upload file"})
//         }

//         res.status(200).send({
//             message: "File uploaded successfully!" + req.file.originalname 
//         });

//     } catch(err){
//         if (err.code == "LIMIT_FILE_SIZE") {
//             return res.status(500).send({
//               message: "File size cannot be larger than 2MB!",
//             });
//         }

//         res.status(500).send({
//             message: `Could not upload file: ${req.file.originalname}. ${err}`
//         })

//     }
// }


const upload = async (req, res) => {
    try {
      await uploadFile(req, res);
  
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
  
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname + err
      });
    }
  };

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    fs.readdir(directoryPath, function (err, files){
        if(err){
            res.status(500).send({
                message: "Unable to scan files ",
            });
        }
    
        let filesInfos = [];
        let baseUrl = 'http://localhost:8080';

        files.forEach((file) =>{
            filesInfos.push({
                name: file,
                url : baseUrl + file,
            });
        });

        res.status(200).send(filesInfos)
    });

};

// const getListFiles = (req, res) => {
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";

//   fs.readdir(directoryPath, function (err, files) {
//     if (err) {
//       res.status(500).send({
//         message: "Unable to scan files!",
//       });
//     }

//     let fileInfos = [];

//     files.forEach((file) => {
//       fileInfos.push({
//         name: file,
//         url: baseUrl + file,
//       });
//     });

//     res.status(200).send(fileInfos);
//   });
// };

const download = (req, res) =>{
    const filename = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    

    res.download(directoryPath + filename, filename, (err)=>{
      
        res.status(500).send({
            message: "Could not download file " + err
            
        });
    });
    return;
}

module.exports = {
    upload,
    getListFiles,
    download
}