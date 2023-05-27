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
                    alert(response.status)
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
                        <h3 class="text-uppercase text-center mb-5">OTPForm</h3>
                        <div class="card">
                            <div class="card-body p-5">
                                <form onSubmit={handleSubmit}>
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label>Message:</label>
                                    <input
                                        type="textbox"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />

                                    <button type="submit">Send OTP</button>
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
