import { object, string, email, coerce, array } from "zod";

export const RoomSchema = object({
  name: string().min(1),
  description: string().min(50),
  capacity: coerce.number().gt(0),
  price: coerce.number().gt(0),
  amenities: array(string()).nonempty(),
});

export const ContactSchema = object({
  name: string().min(3, { message: "Name must be at least 3 characters long" }),
  email: email({ message: "Invalid email format" }),
  subject: string().min(6, {
    message: "Subject must be at least 6 characters long",
  }),
  message: string()
    .min(50, {
      message: "Message must be at least 50 characters long",
    })
    .max(200, {
      message: "Message must not exceed 200 characters",
    }),
});

export const ReserveSchema = object({
  name: string().min(1),
  phone: string().min(10),
});
