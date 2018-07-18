
module.exports = {

    mailOptions : async (user, emailToken) => {

        const userEmail = user.local.email;

        // Send confirmational Email
        let emailOptions = {
            from: 'tester@server.com',
            to: userEmail,
            subject: 'Potvrdite email',
            text: 'Plaintext version of the message',
            html: `<p>Kliknite na ovaj <a href='localhost:3000/korisnici/potvrda?token=${emailToken}'>link</a> kako bi ste potvrdili vasu email adresu</p>`
        };
        return emailOptions;
    }
}