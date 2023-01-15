import { FaPen } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { changeInputValue, detailsUpdate, passwordUpdate } from "../../store/actions";
import "./style.scss";

const Profile = () => {

    const name = useSelector((state) => state.user.name);
    const email = useSelector((state) => state.user.email);
    const passwordOld = useSelector((state) => state.user.passwordOld);
    const password = useSelector((state) => state.user.password);
    const passwordConfirm = useSelector((state) => state.user.passwordConfirm);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showDetailsForm, setShowDetailsForm] = useState(false);
    /* const [passwordOld, setPasswordOld] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState(''); */

    const dispatch = useDispatch();

    // Passing the input name and its value to Store.
     const onInputChange = (event) => {
        dispatch(changeInputValue(event.target.name, event.target.value));
    };

    const handlePasswordUpdate = (event) => {
        event.preventDefault();
        setShowPasswordForm(false);
        dispatch(passwordUpdate());
    }

    const handleDetailsUpdate = (event) => {
        event.preventDefault();
        setShowDetailsForm(false);
        dispatch(detailsUpdate());
    }

  return (
    <div className="profile_container">
        <h1 className="profile__header">Account Details</h1>
        <div className="profile__sub_container">
            <div className="profile__panel_container">
                <div className="profile__panel_name">Personal Information</div>
                <div className="profile__panel_icon"><FaPen onClick={() => setShowDetailsForm(!showDetailsForm)} className="profile__edit_icon" />Update</div>
            </div>
            <form className="profile__detailsform">
                {!showDetailsForm &&
                <div className="profile__info_container">
                    <div className="profile__info_name">Name</div>
                    <div className="profile__info_value">{name}</div>
                </div>
                }
                {!showDetailsForm &&
                    <div className="profile__info_container">
                        <div className="profile__info_name">Email</div>
                        <div className="profile__info_value">{email}</div>
                    </div>
                }
                {showDetailsForm &&
                    <>
                        <div className="profile__info_container">
                            <div className="profile__info_name">Name</div>
                                <input
                                    className="profile__details_input"
                                    type="text"
                                    required={true}
                                    value={name}
                                    onChange={(event) => onInputChange(event)}
                                    name="name"
                                />
                        </div>
                        <div className="profile__info_container">
                            <div className="profile__info_name">Email</div>
                                <input
                                    className="profile__details_input"
                                    type="text"
                                    required={true}
                                    value={email}
                                    onChange={(event) => onInputChange(event)}
                                    name="email"
                                />
                        </div>
                        <div className="profile__buttons_container">
                            <button className="profile__save_btn" onClick={handleDetailsUpdate}>Save</button>
                            <button className="profile__cancel_btn" onClick={() => setShowDetailsForm(false)}>Cancel</button>
                        </div>
                    </>
                }
            </form>
        </div>
        <div className="profile__sub_container">
            <div className="profile__panel_container">
                <div className="profile__panel_name">Password</div>
                <div className="profile__panel_icon"><FaPen onClick={() => setShowPasswordForm(!showPasswordForm)} className="profile__edit_icon" />Update</div>
            </div>
            {showPasswordForm &&
                <form className="profile__password_form" onSubmit={handlePasswordUpdate}>
                <div>
                        <input
                            className="profile__password_input"
                            type="password"
                            required={true}
                            value={passwordOld}
                            onChange={(event) => onInputChange(event)}
                            placeholder="Old password"
                            name="passwordOld"
                        />
                </div>
                <div>
                        <input
                            className="profile__password_input"
                            type="password"
                            required={true}
                            value={password}
                            onChange={(event) => onInputChange(event)}
                            placeholder="New password"
                            name="password"
                        />
                </div>
                <div>
                        <input
                            className="profile__password_input"
                            type="password"
                            required={true}
                            value={passwordConfirm}
                            onChange={(event) => onInputChange(event)}
                            placeholder="Confirm password"
                            name="passwordConfirm"
                        />
                </div>
                <button className='profile__password_submit_btn' type="submit">Save</button>
                <button className='profile__password_cancel_btn' onClick={() => setShowPasswordForm(false)}>Cancel</button>
            </form>
            }
        </div>
    </div>
  )
};

export default Profile;
