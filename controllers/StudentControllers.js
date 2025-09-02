const Student = require('../models/Student')
const cloudinary = require('cloudinary').v2;
async function addstudent(req, res) {
    try {
        console.log(req.body, 'req.body')
        console.log(req.file,"req.file...")
        let result
        if(req.file){
            cloudinary.config({
                cloud_name:'dfsskigvr',
                api_key:'217479788474396',
                api_secret:'lFXYeJOx4EnJ9sHaySMedDT7QfY',                
            })
             result = await cloudinary.uploader.upload(req.file.path);
            console.log(result);
        }
         let student = new Student(req.body);
         if(req.file){
          student.studentImage = result.secure_url;
         }
         await student.save();
        //  console.log("data base updated.....");
        let students = await Student.find({});
        res.render('welcomeadmin', {
            students: students
        });
    } catch (err) {
        console.log(err);
    }
}
async function deleteStudent(req, res) {
    try {
        let studentId = req.params._id;
        // console.log(studentId, 'deleteStudent')
        await Student.deleteOne({ _id: studentId });
        let students = await Student.find({});
        res.render('welcomeadmin', {
            students: students
        })
    } catch (err) {
        console.log(err)
    }
}
async function openEditPage(req, res) {
    try {
        let studentId = req.params._id;
        let student = await Student.findOne({ _id: studentId })
        if (student) {
            res.render('studenteditpage', {
                student: student
            })
        } else {
            res.render('/');
        }
    } catch (err) {
        console.log(err)
    }
}
// /edit/student/:_id.....
async function editStudent(req, res) {
    try {
        const studentId = req.params._id;
        // console.log(studentId + 'studentId')
        let student = await Student.findOne({ _id: studentId });
        if (student) {
            // console.log(req.body, 'req.body')
            student.rollNO = req.body.rollNO;
            student.studentName = req.body.studentName;
            student.fatherName = req.body.fatherName;
            student.course = req.body.course;
            student.branch = req.body.branch;
            student.yearOfAdmission = req.body.yearOfAdmission;
            await student.save();
            let students = await Student.find({});
            res.render('welcomeadmin', {
                students: students
            })
        } else {
            res.end("Student not found...")
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    addstudent,
    deleteStudent,
    openEditPage,
    editStudent
}