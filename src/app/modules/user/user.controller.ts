// import studentValidationSchema from "../student/student.zod.validation";
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  // receive the data from body
  const { password, student: studentData } = req.body;

  // data validation using zod
  // const zodParseData = studentValidationSchema.parse(studentData);

  // creating students collection in db
  const result = await UserServices.createStudentIntoDB(password, studentData);

  //   res.status(200).json({
  //     success: true,
  //     message: 'Student is created successfully',
  //     data: result,
  //   });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
