import { useRef, useState, ChangeEvent, KeyboardEvent, useEffect  } from "react";
import { Formik, useFormik } from "formik";

interface OtpState {
	digitOne: string;
	digitTwo: string;
	digitThree: string;
	digitFour: string;
	digitFive: string;
	digitSix: string;
}

function Otp() {

	const formik = useFormik({
		initialValues: {
		  otp: Array.from({ length: 6 }).fill(''),
		},
		onSubmit: (values) => {
		  // Your submission logic here
		  console.log('Form submitted with values:', values);
		},
	  });
	
	const [otp, setOtp] = useState<OtpState>({
		digitOne: "",
		digitTwo: "",
		digitThree: "",
		digitFour: "",
		digitFive: "",
		digitSix: "",
	});

	const inputRef = useRef<HTMLInputElement[]>([]);

	useEffect(()=>{
		inputRef.current[0].focus()
		inputRef.current[0].addEventListener("paste",pasteText)
		return ()=> inputRef.current[0].removeEventListener("paste",pasteText)
	},[])

	const pasteText = (e: any) => {
		const pastedText = e.clipboardData.getData("text");
	  
		const fieldValues: Record<string, string> = {};
		
		Object.keys(otp).forEach((keys, index) => {
		  fieldValues[keys] = pastedText[index] || '';
		});
		
		const newOtpState: OtpState = {
		  digitOne: fieldValues.digitOne || '',
		  digitTwo: fieldValues.digitTwo || '',
		  digitThree: fieldValues.digitThree || '',
		  digitFour: fieldValues.digitFour || '',
		  digitFive: fieldValues.digitFive || '',
		  digitSix: fieldValues.digitSix || '',
		};
	  
		setOtp(newOtpState);
		inputRef.current[5].focus();
	  };

	const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const { name, value } = e.target;

		if(/[a-z]/gi.test(value)) return

		setOtp((prev) => ({
			...prev,
			[name]: value.slice(-1),
		}));

		if (value && index < 5) {
			inputRef.current[index + 1].focus();
		}
	};

	console.log(otp);

	const handleBackspace = (
		e: KeyboardEvent<HTMLInputElement>,
		index: number
	  ) => {
		if (e.key === "Backspace" && index > 0) {
		  inputRef.current[index - 1].focus();
		}
	  };

	const renderInput = () => {
		return Object.keys(otp).map((keys, index) => (
			<input
				ref={(element) => (inputRef.current[index] = element!)}
				key={keys}
				className="w-16 h-16 border border-black rounded-md mr-3 text-center text-2xl"
				type="text"
				name={keys}
				value={otp[keys as keyof OtpState]}
				onChange={(e) => handleChange(e, index)}
				onKeyUp={(e) => handleBackspace(e, index)}
			/>
		));
	};

	return (
		<form
			action=""
			className="w-screen h-screen flex flex-col justify-center"
		>
			<h1 className="text-3xl text-center mb-14">
				Please fill the OTP here
			</h1>
			<Formik className="flex justify-center">{renderInput()}</Formik>
			<div className="flex justify-center mt-7">
				<button
					type="submit"
					className="btn btn-active btn-primary w-32"
				>
					Submit
				</button>
			</div>
		</form>
	);
}

export default Otp;
