import styles from "./contactForm.module.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { env } from "../env/client.mjs";

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
    <>
      <section className={`${styles.contact}`}>
        <div className="container">
          <div className={`${styles["section-title"]}`}>
            <h2>Contact</h2>
            <p>
              Want to get in touch? Fill out the form below to send me a message
              and I will get back to you as soon as possible!
            </p>
          </div>

          <div className="row">
            <div className="col-lg-5 d-flex align-items-stretch">
              <div className={`${styles.info}`}>
                <div className="address">
                  <i>
                    <CiLocationOn size="20"></CiLocationOn>
                  </i>

                  <h4>Location:</h4>
                  <p>Toronto, ON, CANADA</p>
                </div>

                <div className="email">
                  <i>
                    <AiOutlineMail />
                  </i>
                  <h4>Email:</h4>
                  <p>ahmed.roble@outlook.com</p>
                </div>

                <div className="phone">
                  <i>
                    <AiOutlinePhone />
                  </i>
                  <h4>Call:</h4>
                  <p>+1 647 701 9582</p>
                </div>

                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?q=Toronto,+ON,+Canada&key=${env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                  frameBorder="0"
                  style={{ border: 0, width: "100%", height: "290px" }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="col-lg-7 mt-lg-0 d-flex align-items-stretch mt-5">
              <form
                onSubmit={handleSubmit((data) => submitHandler(data))}
                role="form"
                className={`${styles["email-form"]}`}
              >
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
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
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      {...register("email", {
                        required: "Email is required",
                        minLength: {
                          value: 5,
                          message:
                            "The email must be at least 5 characters long",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email.message}</div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Subject</label>
                  <input
                    type="text"
                    className="form-control"
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
                </div>
                <div className="form-group">
                  <label htmlFor="name">Message</label>
                  <textarea
                    className="form-control"
                    rows={10}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 2,
                        message:
                          "The smessage must be at least 2 to 500 characters long.",
                      },
                      maxLength: {
                        value: 500,
                        message:
                          "The subject must be at least 2 to 500 characters long.",
                      },
                    })}
                  ></textarea>
                  {errors.message && (
                    <div className="text-danger">{errors.message.message}</div>
                  )}
                </div>
                <div className="my-3 text-center">
                  <button type="submit" disabled={isLoading}>
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
