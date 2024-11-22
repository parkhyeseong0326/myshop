import styles from "./sign.module.css"
import { TextField, Fade, Button } from "@mui/material"
import { useState } from "react"

export default function Sign() {
    const [idValue, setIdValue] = useState("");
    const [pwValue, setPwValue] = useState("");
    const [pwCheckValue, setPwCheckValue] = useState("");
    const [showPwField, setShowPwField] = useState(false);
    const [userNameValue, setUserNameValue] = useState("");
    const [showPwCheckField, setShowPwCheckField] = useState(false);

    const [helpText, setHelpText] = useState("6-12자 이내 영문, 숫자 사용가능")
    const [pwHelpText, setPwHelpText] = useState(false);
    const [pwCheckHelpText, setPwCheckHelpText] = useState(false);
    const [idError, setIdError] = useState(false)   
    const [pwError, setPwError] = useState(false);
    const [pwCheckError, setPwCheckError] = useState(false);

    const handleIdChange = (event) => {
        const value = event.target.value;
        setIdValue(value);
        const regexId = /^[a-zA-Z0-9]{6,12}$/;
        if (regexId.test(value)) {
            console.log("유효한 ID입니다")
            setHelpText("사용 가능한 ID 입니다.")
            setIdError(false)
            setShowPwField(true);
        } else {
            console.log("유효하지 않습니다.")
            setHelpText("유효하지 않은 ID입니다. 6-12자 이내 영문, 숫자 사용가능")
            setIdError(true)
            setShowPwField(false);
        }

    };
    const handlePwChange = (event) => {
        const value = event.target.value;
        setPwValue(value);
        const regexPw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        
        if (regexPw.test(value)) {
            setShowPwCheckField(true);
            setPwError(false);
            setPwHelpText("사용 가능한 PW 입니다.")
        } else {
            setShowPwCheckField(false);
            setPwError(true);
            setPwHelpText("비밀번호는 8~16자 이내 영문,숫자,특수문자를 포함해야 합니다.")
        }
        };

    const handlePwCheckChange = (event) => {
    // 목표 : PwTextField에 있는 값을 가져와서 똑같은지 검사
    const value = event.target.value;
    setPwCheckValue(value);
    
    if (pwValue == value) {
        setPwCheckError(false)
        setPwCheckHelpText("비밀번호가 일치합니다.")
    } else {
        setPwCheckError(true)
        setPwCheckHelpText("비밀번호가 일치하지 않습니다.")
    }
    }
    const handleUserNameChange = (event) => {
        const value = event.target.value

        if (value.length >= 0) {
            setUserNameValue(value);
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/register", {
                method : "POST", 
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    username: userNameValue,
                    userId : idValue,
                    password : pwValue,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert("회원가입 완료");
            }else {
                alert("회원가입 실패");
            }
        } catch (error) {
            console.log("회원가입 실패 :", error);
        }
    }

    return (
        <>
            <div className={styles.wrapper}>
                <h2 className={styles.head}>회원가입</h2>
                <div className={styles.from}>
                    <TextField
                        id="username-required"
                        label="Username"
                        placeholder="닉네임"
                        helperText="사용하실 닉네임을 입력해주세요."
                        value={userNameValue}
                        onChange={handleUserNameChange}
                        fullWidth
                    ></TextField>
                    <TextField 
                        error={idError}
                        id="id-required"
                        label="ID"
                        placeholder="ID"
                        helperText={helpText}
                        fullWidth
                        value={idValue}
                        onChange={handleIdChange}
                    ></TextField>
                    {showPwField && (
                        <Fade in={showPwField} timeout={500}>
                            <TextField
                                error={pwError}
                                id="password-required"
                                label="Password"
                                type="password"
                                placeholder="Password"
                                helperText={pwHelpText}
                                value={pwValue}
                                onChange={handlePwChange}
                                fullWidth
                            >
                            </TextField>
                        </Fade>
                    )}
                       {showPwCheckField && (
                        <Fade in={showPwCheckField} timeout={500}>
                            <TextField
                                error={pwCheckError}
                                id="password-match"
                                label="Password 재확인"
                                type="password"
                                placeholder="Password 다시 입력"
                                helperText={pwCheckHelpText}
                                value={pwCheckValue}
                                onChange={handlePwCheckChange}
                                fullWidth
                            >
                            </TextField>
                        </Fade>
                    )}
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        style={{marginTop: '20px'}}
                    >Continue</Button>
                </div>
            </div>
        </>
    )
}