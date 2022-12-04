import styles from "./contactForm.module.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";

type Formvalues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Formvalues>({});
  async function submitHandler(Formdata) {
    const { email, name, subject, message } = Formdata;
    setIsLoading(true);
    try {
      const response = await fetch(`${window.location.origin}/api/contact`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });
      setIsLoading(false);
      const data = await response.json();
      if (data.success) router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
          <p className="fs-4 text-secondary">
            Want to get in touch? Fill out the form below to send me a message
            and I will get back to you as soon as possible!
          </p>
          <div className="my-5">
            <form onSubmit={handleSubmit((data) => submitHandler(data))}>
              <div className="text-danger"></div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`${styles.noBorder} form-control fs-5 shadow-none`}
                  {...register("name", {
                    required: "Contact name is required",
                    minLength: {
                      value: 2,
                      message:
                        "The name must be at least 2 to 100 characters long",
                    },
                    maxLength: {
                      value: 100,
                      message:
                        "The name must be at least 2 to 100 characters long",
                    },
                  })}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name.message}</div>
                )}
                <label>Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={`${styles.noBorder} form-control fs-5 shadow-none`}
                  {...register("email", {
                    required: "Email is required",
                    minLength: {
                      value: 5,
                      message: "The email must be at least 5 characters long",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email.message}</div>
                )}
                <label>Email Address</label>
              </div>
              <div className="form-floating mb-3 shadow-none">
                <input
                  type="text"
                  className={`${styles.noBorder} form-control fs-5 shadow-none`}
                  {...register("subject", {
                    required: "Subject is required",
                    minLength: {
                      value: 2,
                      message:
                        "The subject must be at least 2 to 100 characters long",
                    },
                    maxLength: {
                      value: 100,
                      message:
                        "The subject must be at least 2 to 100 characters long",
                    },
                  })}
                />
                {errors.subject && (
                  <div className="text-danger">{errors.subject.message}</div>
                )}
                <label>Subject</label>
              </div>
              <div>
                <textarea
                  className="form-control fs-5 shadow-none"
                  placeholder="Type a message..."
                  rows={5}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 2,
                      message:
                        "The smessage must be at least 2 to 100 characters long.",
                    },
                    maxLength: {
                      value: 100,
                      message:
                        "The subject must be at least 2 to 100 characters long.",
                    },
                  })}
                ></textarea>
                {errors.message && (
                  <div className="text-danger">{errors.message.message}</div>
                )}
              </div>
              <br />
              <button
                className="btn btn-primary text-uppercase w-25 fs-5 
                fw-bolder"
                disabled={isLoading}
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
