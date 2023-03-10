<script setup>
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";
import { db } from "../main";
import { ref, onMounted } from "vue";
// router
const router = useRouter();
//sign in 
const S_username = ref('');
const S_Fname = ref('');
const S_Lname = ref('');
const S_email = ref('');
const S_password = ref('');
//log in
const L_email = ref('');
const L_password = ref('');
const auth = getAuth();
const user = auth.currentUser;
//email
const signinData = async (uid) => {
    try {
        await setDoc(doc(db, "users", uid), {
            username: S_username.value,
            firstname: S_Fname.value,
            lastname: S_Lname.value,
            email: S_email.value,
            password: S_password.value
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
const signin = () => {
    createUserWithEmailAndPassword(auth, S_email.value, S_password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            signinData(user.uid)
            alert('create succeed ' + S_username);
            router.push('/');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("email or password wrong!!");
            console.log('er cd ' + typeof(errorCode));
            console.log('er msg ' + typeof(errorMessage));
            // ..
        });
}
//email
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const login = () => {
    signInWithEmailAndPassword(auth, L_email.value, L_password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            const email = user.email;
            router.push('main');
            alert('wellcome ' + user.email)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("email or password wrong!!");
            console.log('er cd login ' + errorCode);
            console.log('er msg ' + errorMessage);
        });
}
//google
const logingoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            console.log(user);
            router.push('/main')
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log('er cd ' + errorCode);
            console.log('er msg ' + errorMessage);
            console.log('email ' + email);
            console.log('credential ' + credential);
        });
}
//
var obj_content = {};
var contents = ref([]);
const getDataContent = async () => {
    const querySnapshot = await getDocs(query(collection(db, "contents"), orderBy("time", "desc")));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data().content}`);
        //console.log(`${doc.id} => ${doc.data().time}`);
        obj_content = {
            time: doc.data().time,
            content: doc.data().content,
            username: doc.data().username,
        }
        contents.value.push(obj_content);
    });
}
onMounted(() => {
    getDataContent();
});
</script>
<template>
    <div class="position-fixed" style="height: 100%; width:20rem;">
        <div class="container h-100 m-0">
            <div class=" border-end h-100">
                <div class="ps-5 pt-3 pe-4 ">
                    <div class="p-3 text-center"><img src="../assets/elephant.png" alt="logo" width="100" />
                    </div>
                    <div class="d-flex align-items-center mu mt-4 p-3">
                        <img src="https://img.icons8.com/fluency/96/null/home.png" alt="home" width="40" height="40" />
                        <div class="ps-2 menu">
                            หน้าหลัก
                        </div>
                    </div>
                    <div class="d-flex align-items-center mu mt-4 p-3">
                        <img src="https://img.icons8.com/fluency/96/null/connection-status-off.png" alt="add more"
                            width="40" height="40" />
                        <div class="ps-2 menu">
                            เพิ่มเติม
                        </div>
                    </div>
                    <div class="d-flex align-items-center mt-4">
                        <button class="btn btn-primary w-100" data-bs-target="#Login"
                            data-bs-toggle="modal">เข้าสู่ระบบ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container" style="width: 90vh;">
        <div>
            <div class="mt-2">
                <div class="border border-top-0 ps-2 py-3 ">
                    <h4> หน้าหลัก </h4>
                </div>
                <div class="border border-top-0 pt-4 py-2" v-for="(value, key) in contents" :key="key">
                    <div class="row">
                        <div class="col-2 d-flex justify-content-center">
                            <img src="https://img.icons8.com/fluency/96/null/user-male-circle.png" alt="demo" width="60"
                                height="60" />
                        </div>
                        <div class="col ">
                            <div>
                                <div class="">
                                    <div>
                                        <h4>{{ value.username }}</h4>
                                    </div>
                                </div>
                                <p>{{ value.content }}</p>
                            </div>
                            <div class="row pt-2">
                                <div class="col-1 d-flex justify-content-center">
                                    <a href=""> <img src="https://img.icons8.com/fluency/96/null/topic.png" alt="add img"
                                            width="30" /></a>
                                </div>
                                <div class="col-1 d-flex justify-content-center">
                                    <a href=""><img src="https://img.icons8.com/fluency/96/null/filled-like.png"
                                            alt="add emogi" width="30" /></a>
                                </div>
                                <div class="col"></div>
                                <div class="col d-flex justify-content-end  pe-5">
                                    <div class="text-end">
                                        <p style="font-size: 10px;">{{ value.time }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="position-fixed bottom-0 w-100">
        <div style="height: 70px; background-color:rgb(29, 155, 240);">
            <div class="container h-100 ">
                <div class="row h-100 align-items-center justify-content-center">
                    <div class="col-6">
                        <div class="text-light">
                            <span style="font-size: 23px;">ไม่พลาดสิ่งที่เกิดขึ้น</span><br>
                            <span style="font-size: 15px;">และจะได้รู้ก่อนใคร</span>
                        </div>
                    </div>
                    <div class="col-2 d-flex justify-content-end">
                        <button class="btn btn-outline-light" data-bs-target="#Login"
                            data-bs-toggle="modal">เข้าสู่ระบบ</button>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-light" data-bs-target="#Signin" data-bs-toggle="modal">สมัคร</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="Login" aria-hidden="true" aria-labelledby="Login" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="Login">เข้าสู่ระบบ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form__group field w-100">
                        <input type="email" class="mt-2 form__field" v-model="L_email" required>
                        <label for="email" class="mt-2 form__label">email</label>
                    </div>
                    <div class="form__group field w-100">
                        <input type="password" class="form__field" v-model="L_password" required>
                        <label for="password" class="form__label">password</label>
                    </div>
                    <div class="mt-2 d-flex justify-content-center align-items-center gap-2">
                        <div>
                            or
                        </div>
                        <a data-bs-dismiss="modal" aria-label="Close" @click="logingoogle()">
                            <img src="https://img.icons8.com/fluency/96/null/google-logo.png" alt="google" width="50"
                                height="50" /></a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close"
                        @click="login()">เข้าสู่ระบบ</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="Signin" aria-hidden="true" aria-labelledby="Signin" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="Signin">สมัครสมาชิก</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div>
                            <div class="form__group field w-100">
                                <input type="text" class="form__field" v-model="S_username" required>
                                <label for="username" class="form__label">username</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form__group field w-100">
                                <label class="form__label" for="firstname">firstname</label>
                                <input class="form__field" type="text" v-model="S_Fname" required>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form__group field w-100">
                                <label class="form__label" for="lastname">lastname</label>
                                <input class="form__field" type="text" v-model="S_Lname" required>
                            </div>
                        </div>
                        <div>
                            <div class="form__group field w-100">
                                <input type="email" class="form__field" v-model="S_email" required>
                                <label for="email" class="form__label">email</label>
                            </div>
                        </div>
                        <div>
                            <div class="form__group field w-100">
                                <input type="password" class="form__field" v-model="S_password" required>
                                <label for="password" class="form__label">password</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close"
                        @click="signin()">สมัคร</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mu {
    transition: 0.5s;
    height: 70px;
    border-radius: 50px;
}
.mu:hover {
    height: 70px;
    background-color: rgb(237, 233, 234, 0.1);
    border-radius: 50px;
    transition: 0.5s;
}
.menu {
    font-size: 25px;
    font-weight: bold;
}
button {
    height: 50px;
}
.form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
}
.form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid gray;
    outline: 0;
    font-size: 1.3rem;
    color: rgb(16, 15, 15);
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
}
.form__field::placeholder {
    color: transparent;
}
.form__field:placeholder-shown~.form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
}
.form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: gray;
}
.form__field:focus~.form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #11998e;
    font-weight: 700;
}
.form__field:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
}
.form__field:required,
.form__field:invalid {
    box-shadow: none;
}
</style>