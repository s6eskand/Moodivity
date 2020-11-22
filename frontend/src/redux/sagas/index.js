// sagas
import authSagas from "./auth";
import profileSagas from "./profile";
import logsSagas from "./logs";

const sagas = [
    authSagas,
    profileSagas,
    logsSagas,
];

const registerSagas = (middleware) => {
    sagas.map((saga) => {
        middleware.run(saga);
    });
};

export default registerSagas;