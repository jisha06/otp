import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const OTPForm = () => {
    const [otp, setOTP] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const email = useParams();
    console.log("Email in otp  " + email.id)

    const handleSubmit = (e) => {
         e.preventDefault();
        e.preventDefault();       
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(otp, email, message)
        axios.post(`http://localhost:3002/OTPVerify`, { otp, email })
            .then((response) => {

                if (response.status == 200) {
                    {
                        navigate('/Welcome')
                    }

                }
                else {
                    alert("something went wrong")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <h3 class="text-uppercase text-center mb-5">OTPForm</h3>
                        <div class="card">
                            <div class="card-body p-5">
                                <form onSubmit={handleSubmit}>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example1cg">Enter OTP:</label>
                                        <input id="form3Example1cg" class="form-control form-control-lg"
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOTP(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {/* <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example1cg">Message</label>
                                        <input id="form3Example1cg" class="form-control form-control-lg"
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        />
                                    </div> */}
                                    <div class="form-outline mb-4">
                                    <button class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" type="submit" onClick={onSubmit}>Submit OTP</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default OTPForm
