<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";
import { useRouter } from "vue-router";
const router = useRouter();
const auth = getAuth();
const usm = ref('username');
const L_id = ref('');
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        L_id.value = uid;
        //console.log(uid);
    } else {
        // User is signed out
        // ...
    }
});
const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data().username}`);
        if (L_id.value == doc.id) {
            usm.value = doc.data().username;
        }
    });
}
const S_out = () => signOut(auth)
    .then(() => {
        // Sign-out successful.
        alert('you have log out !!');
        router.push('/');
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
onMounted(() => {
    getData();
});
</script>
<template>
    <div class="ps-5 pt-3 pe-4">
        <div class="p-3 text-center"><img src="../assets/elephant.png" alt="logo" width="100" /></div>
        <div class="d-flex align-items-center mu mt-4 p-3">
            <img src="https://img.icons8.com/fluency/96/null/home.png" alt="home" width="40" height="40" />
            <div class="ps-2 menu">
                หน้าหลัก
            </div>
        </div>
        <div class="d-flex align-items-center mu mt-4 p-3">
            <img src="https://img.icons8.com/fluency/96/null/gender-neutral-user.png" alt="user" width="40" height="40" />
            <div class="ps-2 menu">
                ข้อมูลส่วนตัว
            </div>
        </div>
        <div class="d-flex align-items-center mu mt-4 p-3">
            <img src="https://img.icons8.com/fluency/96/null/connection-status-off.png" alt="add more" width="40"
                height="40" />
            <div class="ps-2 menu">
                เพิ่มเติม
            </div>
        </div>
        <div class="d-flex align-items-center mt-4">
            <button class="btn btn-primary w-100">ทวีต</button>
        </div>
        <div class="position-absolute bottom-0 start-0 ms-5 my-5">
            <div class="container profile d-flex align-items-center">
                <div class="row align-items-center justify-content-center">
                    <div class="col">
                        <img src="https://img.icons8.com/fluency/96/null/user-male-circle.png" alt="demo" width="60"
                            height="60" />
                    </div>
                    <div class="col">
                        {{ usm }}
                    </div>
                    <div class="col dropup-center dropup">
                        <a data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://img.icons8.com/fluency/96/null/menu-2.png" alt="minimenu" width="40"
                                style="rotate: 90deg;" />
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">ข้อมูลส่วนตัว</a></li>
                            <li><a class="dropdown-item" @click="S_out()">ลงชื่อออก</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.menu {
    font-size: 25px;
    font-weight: bold;
}
button {
    height: 50px;
}
.profile {
    transition: 0.5s;
    height: 70px;
    border-radius: 50px;
}
.profile:hover {
    height: 70px;
    background-color: rgb(237, 233, 234, 0.1);
    border-radius: 50px;
    transition: 0.5s;
}
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
</style>
