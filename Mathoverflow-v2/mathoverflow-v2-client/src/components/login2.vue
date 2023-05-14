<template>
    <div class="login-box">
        <a @click="emitLogin" class="px-16 py-2">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {{ text }}
        </a>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        text: {
            type: String,
            default: ''
        }
    },
    methods: {
        emitLogin() {
            this.$emit("emitAction", this.text);
        }
    }
})
</script>
<style scoped>
.login-box {
    position: absolute;
    top: 98%;
    left: 50%;
    /* width: 800px; */
    padding: 40px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    border-radius: 15px;
}

.login-box a {
    position: relative;
    display: inline-block;
    /* padding-right: 20px;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px; */
    color: #03e9f4;
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: 0.5s;
    /* margin-top: 40px; */
    letter-spacing: 2px;
    border-radius: 5px;
}

.login-box a:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 35px #03e9f4,
        0 0 80px #03e9f4;
}

.login-box a span {
    position: absolute;
    display: block;
}

.login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
    0% {
        left: -100%;
    }
    50%,
    100% {
        left: 100%;
    }
}

.login-box a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: 0.25s;
}

@keyframes btn-anim2 {
    0% {
        top: -100%;
    }
    50%,
    100% {
        top: 100%;
    }
}

.login-box a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: 0.5s;
}

@keyframes btn-anim3 {
    0% {
        right: -100%;
    }
    50%,
    100% {
        right: 100%;
    }
}

.login-box a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: 0.75s;
}

@keyframes btn-anim4 {
    0% {
        bottom: -100%;
    }
    50%,
    100% {
        bottom: 100%;
    }
}
</style>