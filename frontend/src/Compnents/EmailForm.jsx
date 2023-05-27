import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('')
    const [save, setdata] = useState([])
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, message);
    };

    const onSubmit = (email, message) => {

        const data = { email, message }

        console.log(data)
        axios.post(`http://localhost:3002/addOtp`, data)
            .then((response) => {

                if (response.status == 200) {
                    {
                        alert("OTP sent successfully")
                        navigate('/OTPForm/' + email)
                    }

                }
                else {
                    alert(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        const emailid = email
        navigate('/OTPForm/' + emailid)
    }
    return (
        <div>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <h3 class="text-uppercase text-center mb-5">Email Form</h3>
                        <div class="card">
                            <div class="card-body p-5">
                                <form onSubmit={handleSubmit}>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example1cg">Email:</label>
                                        <input id="form3Example1cg" class="form-control form-control-lg"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {/* <label>Message:</label>
                                    <input
                                        type="textbox"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    /> */}

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

export default EmailForm
