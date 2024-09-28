import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: '{VALUE} is not in capitalize format' },
    ),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty('Last name is required'),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string().trim().nonempty('Father name is required'),
  fatherOccupation: z.string().trim().nonempty('Father occupation is required'),
  fatherContactNo: z
    .string()
    .trim()
    .nonempty('Father contact number is required'),
  motherName: z.string().trim().nonempty('Mother name is required'),
  motherOccupation: z.string().trim().nonempty('Mother occupation is required'),
  motherContactNo: z
    .string()
    .trim()
    .nonempty('Mother contact number is required'),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().trim().nonempty('Local guardian name is required'),
  occupation: z
    .string()
    .trim()
    .nonempty('Local guardian occupation is required'),
  contactNo: z
    .string()
    .trim()
    .nonempty('Local guardian contact number is required'),
  address: z.string().trim().nonempty('Local guardian address is required'),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string().trim().optional(),
      email: z
        .string()
        .trim()
        .email('Invalid email format')
        .nonempty('Email is required'),
      contactNo: z.string().trim().nonempty('Contact number is required'),
      emergencyContactNo: z
        .string()
        .trim()
        .nonempty('Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim().nonempty('Present address is required'),
      permanentAddress: z
        .string()
        .trim()
        .nonempty('Permanent address is required'),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().trim().optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
