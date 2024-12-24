import React from "react";
import { Box } from "@mui/material";
import { BuyerContext } from "../../Context/Context";
import { useContext, useState } from "react";
export default function ContactContent() {
  const { submitFeedback } = useContext(BuyerContext);
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    submitFeedback(formInfo);
    setFormInfo({ name: "", email: "", subject: "", message: "" });
  };
  return (
    <div>
      <section className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Get in Touch</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Excepturi, magnam. Ex mollitia doloremque aperiam, deleniti
                suscipit enim dicta molestias quisquam.
              </p>
            </div>
            <div className="col-lg-12">
              <Box
                component={"form"}
                onSubmit={handleSubmit}
                className="form-contact contact_form"
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        onChange={(e) =>
                          setFormInfo({
                            ...formInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="form-control w-100"
                        name="message"
                        value={formInfo?.message}
                        id="message"
                        cols={30}
                        rows={3}
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter Message'"
                        placeholder=" Enter Message"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        onChange={(e) =>
                          setFormInfo({
                            ...formInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="form-control valid"
                        name="name"
                        value={formInfo?.name}
                        id="name"
                        type="text"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter your name'"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        onChange={(e) =>
                          setFormInfo({
                            ...formInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="form-control valid"
                        name="email"
                        value={formInfo?.email}
                        id="email"
                        type="email"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter email address'"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        onChange={(e) =>
                          setFormInfo({
                            ...formInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="form-control"
                        name="subject"
                        id="subject"
                        value={formInfo?.subject}
                        type="text"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter Subject'"
                        placeholder="Enter Subject"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="button button-contactForm boxed-btn"
                  >
                    Send
                  </button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
