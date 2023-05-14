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
                                xs="12"
                                sm="12"
                                md="6"
                                lg="3"
                                class="mt-6"
                                v-for="(user, i) in historyList"
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
                                                <span>
                                                    <v-btn
                                                        v-if="
                                                            checkUserAction(
                                                                user
                                                            ) || getAdmin
                                                        "
                                                        x-small
                                                        outlined
                                                        color="#B388FF"
                                                        rounded
                                                        text
                                                        class="mt-5"
                                                        @click="
                                                            deleteUser(user)
                                                        "
                                                    >
                                                        Delete User
                                                    </v-btn>
                                                    <v-icon
                                                        v-if="
                                                            !checkUserAction(
                                                                user
                                                            )
                                                        "
                                                        class="mt-5 mb-5"
                                                        >mdi-icon</v-icon
                                                    >
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
                <v-pagination
                    class="mt-8"
                    v-model="page"
                    :length="pages"
                    @input="updatePage"
                    circle
                    color="#B388FF"
                ></v-pagination>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import store from '@/store';
import Vue from 'vue'
import { mapGetters } from 'vuex';
import { deleteAnswer, deleteAnswerVote, deleteQuestion, deleteVote, getAnswer, getQuestion, getUser, getUserReputation, getUsers, removeUser } from './functions';
export default Vue.extend({
    data: () => ({
        users: [] as any[],
        admin: true,
        page: 1,
        pageSize: 4,
        listCount: 0,
        historyList: [] as any[]
    }),
    watch: {
        getUsers() {

        }
    },
    computed: {
        ...mapGetters(["getQuestions", "getUsers", "getLoggedUser", "getAdmin"]),
        pages(): number {
            if (this.pageSize == null || this.listCount == null) return 0;
            return Math.ceil(this.listCount / this.pageSize);
        }
    },
    methods: {
        checkUserAction(item: any) {
            console.log(item, 'the item in check user acctions in user profile')
            console.log(this.getLoggedUser, 'the get logged user')
            if (item.user_id === this.getLoggedUser.user_id) return true;
            else false;
        },
        initPage() {
            this.listCount = this.users.length;
            if (this.listCount < this.pageSize) {
                this.historyList = this.users;
            } else {
                this.historyList = this.users.slice(0, this.pageSize);
            }
            console.log(this.historyList, 'teh hist list')
        },
        updatePage(pageIndex: any) {
            let start = (pageIndex - 1) * this.pageSize;
            let end = pageIndex * this.pageSize;
            this.historyList = this.users.slice(start, end);
            this.page = pageIndex;
        },
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
                    //
                    const vot = questionData.votes
                    if (vot.length !== 0) {
                        for (const vote of vot) {
                            await deleteVote(vote.vote_id)
                        }
                    }
                    //delete answers
                    const answers = questionData.answers;
                    if (answers.length !== 0) {
                        for (const answer of questionData.answers) {
                            const answerData = await getAnswer(answer.answer_id)
                            console.log(answerData, 'the answer data')
                            if (answerData.answerVotes.length !== 0) {
                                for (const answerVote of answerData.answerVotes) {
                                    await deleteAnswerVote(answerVote.vote_id)
                                }
                            }
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
            const userIndex = this.users.findIndex((el: any) => el.user_id === value.user_id)
            const userIndex2 = this.historyList.findIndex((el: any) => el.user_id === value.user_id)
            console.log(userIndex, 'the user index!')
            console.log(this.historyList, 'the user history list!')
            if (userIndex !== -1) {
                this.users.splice(userIndex, 1)
            }
            if (userIndex2 !== -1) {
                this.historyList.splice(userIndex, 1)
            }
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
        await getUsers()
        // this.getUsers;
        await this.fetchUsers()
        //
        this.initPage();
        this.updatePage(this.page);
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