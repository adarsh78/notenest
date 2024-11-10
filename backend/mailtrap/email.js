// import { mailtrapClient, sender } from "./mailtrap.config.js";

// export const sendPasswordResetEmail = async (email, resetLink) => {

//     const recipient = [{ email }];   
    
// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: "Reset your password",
// 			html: `<>Reset your password from here<a href="${resetLink}">Reset</a></p>`,
// 			category: "Password Reset",
// 		});
//         console.log(response);
// 	} catch (error) {
// 		console.error(`Error sending password reset email: `, error);
// 		throw new Error(`Error sending password reset email: ${error}`);
// 	}
// }

// export const sendResetSuccessEmail = async (email) => {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: "Password Reset Successful",
// 			html: `<p>Password reset successfully.</p>`,
// 			category: "Password Reset",
// 		});

// 		console.log("Password reset email sent successfully", response);
// 	} catch (error) {
// 		console.error(`Error sending password reset success email`, error);

// 		throw new Error(`Error sending password reset success email: ${error}`);
// 	}
// };