<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col justify="center" align="center">
                <v-card>
                    <v-img> </v-img>
                    <v-card-title> MathOverflow </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        required
                                        v-model="username"
                                        :rules="usernameRules"
                                        label="Username"
                                        prepend-icon="mdi-account"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        required
                                        v-model="email"
                                        :rules="emailRules"
                                        label="Username"
                                        prepend-icon="mdi-message"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        required
                                        v-model="password"
                                        :rules="passwordRules"
                                        label="Username"
                                        prepend-icon="mdi-lock"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn small class="px-11 py-2" outlined> Login </v-btn>
                    </v-card-actions>
                    <!--  -->
                    <v-row>
                        <v-col class="text-body-2">
                            <span v-if="inLogIn">
                                Don't have an account?
                                <span class="blue--text" @click="changeToSignUp"
                                    >Sign Up</span
                                >
                            </span>
                            <span v-else-if="inSignUp">
                                Already have an account?
                                <span class="blue--text" @click="changeToLogIn"
                                    >Login</span
                                >
                                &nbsp;
                            </span>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>