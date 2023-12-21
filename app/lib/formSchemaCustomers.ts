import { z } from 'zod';

{
  /*email: z.string().email({
    message: 'Please enter a valid email',
  }),

  image_url: z.string().url({
    message: 'Please enter a valid URL',
     }),
  */
}
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

const formSchemaCustomer = z.object({
  id: z.string(),

  name: z
    .string()
    .refine((data) => data.trim().length > 0, {
      message: 'Please enter a name',
    })
    .refine((data) => data.trim().length >= 4, {
      message: 'Name must be at least 4 characters long',
    }),

  email: z.string().email({
    message: 'Please enter a valid email',
  }),

  image_url: z
    .string()
    .refine((data) => data.trim().length > 0 && urlRegex.test(data), {
      message: 'Please enter a valid URL for the image',
    }),
});

export type StateCustomer = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

const CreateCustomer = formSchemaCustomer.omit({ id: true });
const UpdateCustomer = formSchemaCustomer.omit({ id: true });

export { CreateCustomer, UpdateCustomer };
