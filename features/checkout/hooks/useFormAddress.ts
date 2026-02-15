import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const useFormAddress =()=>{
    const formSchema = z.object({
  firstName: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  secondName: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  companyName: z.string(),
  country: z.string().min(1, "Please select your country."),
  city: z.string().min(1, "Please select your city."),
  streetAddress: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  phone: z.number(),
  email: z.email(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
      companyName: "",
      city:"",
      streetAddress: "",
      description: "",
    },
  });


  

return{formSchema,form}
}