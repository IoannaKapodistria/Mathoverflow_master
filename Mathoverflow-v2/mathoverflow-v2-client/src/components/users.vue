<template>
    <v-container fluid>
        <v-card
            color="#B388FF"
            rounded="md"
            elevation="3"
            width="30%"
            style="z-index: 20001"
            class="overlayUsers"
            dark
        >
            <v-card-text
                class="text-overline font-weight-bold d-flex justify-center py-2"
                style="color: white"
            >
                <v-icon class="me-2">mdi-account-group</v-icon>Users
            </v-card-text>
        </v-card>
        <v-card flat style="border-top: 2px solid #b39ddb" rounded="sm">
            <!-- <v-toolbar flat>
                <v-toolbar-title> Users </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon>mdi-account-group</v-icon>
            </v-toolbar>
            <v-divider></v-divider> -->
            <v-card-text class="pt-8">
                <v-row class="mt-10">
                    <v-col cols="12">
                        <v-row>
                            <v-col
                                cols="3"
                                class="mt-6"
                                v-for="(user, i) in this.users"
                                :key="i"
                            >
                                <v-card
                                    rounded="lg"
                                    style="border: 2px solid #f8bbd0"
                                    class="pb-4 pe-4"
                                >
                                    <v-row>
                                        <v-col cols="5" class="pa-0 mb-5">
                                            <v-img
                                                contain
                                                src="/prof_photo.png"
                                                @click="userProfile(user)"
                                                style="cursor: pointer"
                                            ></v-img>
                                        </v-col>
                                        <v-col class="pa-0">
                                            <!-- <v-card-title> Ioanna </v-card-title> -->
                                            <v-card-text>
                                                <span
                                                    @click="userProfile(user)"
                                                    style="cursor: pointer"
                                                    class="blue--text text-overline"
                                                >
                                                    {{ user.username }}
                                                </span>
                                                <div>Greece</div>
                                                <div
                                                    class="text-caption mt-2 grey--text"
                                                >
                                                    Total Reputation:<span
                                                        class="text-caption mt-2 black--text ms-2"
                                                        >{{
                                                            user.reputation
                                                        }}</span
                                                    >
                                                </div>
                                                <span v-if="admin">
                                                    <v-btn
                                                        x-small
                                                        outlined
                                                        rounded
                                                        text
                                                        class="mt-5"
                                                        @click="
                                                            deleteUser(user)
                                                        "
                                                    >
                                                        <!-- <v-icon>mdi-delete</v-icon> -->
                                                        Delete User
                                                    </v-btn>
                                                </span>
                                            </v-card-text>

                                            <!-- <v-card-actions> -->
                                            <!-- </v-card-actions> -->
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import store from '@/store';
import Vue from 'vue'
import { mapGetters } from 'vuex';
import { deleteAnswer, deleteQuestion, getQuestion, getUser, getUserReputation, removeUser } from './functions';
export default Vue.extend({
    data: () => ({
        users: [
            // { name: "ioanna" }, { name: "tolis" }, { name: "ioanna" }, { name: "tolis" }, { name: "ioanna" }, { name: "tolis" }
        ] as any[],
        admin: true
    }),
    watch: {
        getUsers() {

        }
    },
    computed: {
        ...mapGetters(["getQuestions", "getUsers"]),
    },
    methods: {
        async userProfile(user: any) {
            console.log(user, "the value of click user");
            const userId = user.user_id;
            const userData = await getUser(userId);
            console.log(userData, "the card data");
            store.commit("setUserData", userData);
            this.$router.push(`/users/${userId}`);
        },
        async deleteUser(value: any) {
            console.log(value, "the value of delete user")
            //when delete user delete all his questions and answers
            const questions = this.getQuestions
            for (const question of questions) {
                if (question.UserUserId === value.user_id) {
                    const questionData = await getQuestion(question.question_id);
                    const answers = questionData.answers;
                    if (answers.length !== 0) {
                        for (const answer of questionData.answers) {
                            //delete user's answers
                            const deleteAnswerObject = await deleteAnswer(answer.answer_id);
                        }
                    }
                    //delete the user's questions
                    const deleteQuestion1 = await deleteQuestion(question.question_id)
                }
            }
            //and then delete user
            const deleteUserObject = await removeUser(value.user_id);
            await this.$nextTick()
            this.forceUpdateUsers();
        },
        async forceUpdateUsers() {
            // this.$router.go(0)
            // // window.location.reload()
            // // this.getUsers
            // await this.$nextTick()
            // this.$router.push('/').catch((err: any) => {
            //     console.warn('error in redirect to /users :', err)
            // });

            this.$router.push('/users').catch((err: any) => {
                console.warn('error in redirect to /users :', err)
            });

        },
        async fetchUsers() {
            for (const user of this.getUsers) {
                const userObject = {
                    ...user,
                    reputation: await this.getUserRep(user.user_id)
                }
                this.users.push(userObject)
            }
        },
        async getUserRep(userId: number) {
            const userRep = await getUserReputation(userId)
            console.log(userRep, 'the user reputation')
            return userRep.value;
        }
    },
    async mounted() {
        this.getUsers;
        await this.fetchUsers()
    }
}) // na mpei pagination katw katw se periptwsh pollwn users
</script>
<style>
.qTittle {
    white-space: pre-line !important;
    color: #166ac2;
}

.overlayUsers {
    top: 16px;
    left: 10px;
}
</style>