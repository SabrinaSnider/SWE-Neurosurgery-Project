import React, {useState} from 'react';
import './ResetPassword.css'
import httpUser from '../../httpUser'

const ResetPassword = (props) => {
    return (
        <div class="row">
            <div class="col-md-12">
                <form action={"/patient/reset/" + props.token} method="POST">
                <legend>Reset Password</legend>
                <div class="form-group">
                    <label for="password">New Password</label>
                    <input type="password" name="password" placeholder="New password" autofocus="autofocus" class="form-control"/>
                </div>
                <div class="form-group">
                    <label for="confirm">Confirm Password</label>
                    <input type="password" name="confirm" placeholder="Confirm password" class="form-control"/>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Update Password</button>
                </div>
                </form>
            </div>
        </div>  
    );
}

export default ResetPassword;