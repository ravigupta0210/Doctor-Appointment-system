const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({
            message: "Users Data Loaded",
            success: true,
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error while fetching User Details!",
            success: false,
            error,
        });
    }
}
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            message: "Doctors Data Loaded",
            success: true,
            data: doctors,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error while fetching Doctor Details!",
            success: false,
            error,
        });
    }
};
//doctor account status
const changeAccountStatusContoller = async (req, res) => {
    try {
        const {doctorId,status} = req.body;
        const doctor = await  doctorModel.findByIdAndUpdate(doctorId,{status});
        const user = await userModel.findOne({_id:doctor.userId});
        const notifcation=user.notifcation
        notifcation.push({
            type:'doctor-account-request-updated',
            message: `Your Doctor Account request has ${status}`,
            onClickPath: '/notification'
        });
        user.isDoctor = status === 'approved' ? true : false;
        await user.save();
        res.status(201).send({
            success:true,
            message:'Account Status Updated',
            data : doctor,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error while changing the status!",
            success: false,
            error,
        });
    }
};
module.exports = { getAllUsersController, getAllDoctorsController, changeAccountStatusContoller };