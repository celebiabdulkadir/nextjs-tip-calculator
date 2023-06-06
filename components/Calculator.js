import React, { useState, useEffect } from 'react';

const Calculator = () => {
	// TODO: start coding here!

	const [billItems, setBillItems] = useState({
		bill: '',
		tip: '',
		people: '',
	});

	const [tipAmountByPerson, setTipAmountByPerson] = useState(0);
	const [totalAmountByPerson, setTotalAmountByPerson] = useState(0);

	const validateInput = (value, isIntRequired = false) => {
		// Check if the value is numeric
		if (isNaN(value) || value.includes(' ')) {
			return '';
		}

		// Check if the value should be integer
		if (isIntRequired && value % 1 !== 0) {
			return '';
		}

		// Otherwise return as is
		return value;
	};

	const calculatetipAmount = () => {
		if (billItems.people === 0 || billItems.people === '') {
			setTipAmountByPerson(0);
		} else {
			const tipAmount = parseFloat(
				(Number(billItems.bill) * Number(billItems.tip)) /
					100 /
					Number(billItems.people)
			).toFixed(2);
			setTipAmountByPerson(tipAmount);
		}
	};

	const calculateTotalAmount = () => {
		if (billItems.people === 0 || billItems.people === '') {
			setTotalAmountByPerson(0);
		} else {
			const totalAmount = parseFloat(
				(Number(billItems.bill) +
					Number(billItems.tip * Number(billItems.bill)) / 100) /
					Number(billItems.people)
			).toFixed(2);
			setTotalAmountByPerson(totalAmount);
		}
	};
	useEffect(() => {
		calculatetipAmount();
		calculateTotalAmount();
	}, [billItems]);

	return (
		<main>
			<img
				src='./icons/logo.svg'
				className='logo'
				alt="Splitter logo. 'SPLI' on one line and 'TTER' on another to indicate splitting."
			/>
			<section className='card'>
				<div className='card-left'>
					<div className='input-group' id='totalBillGroup'>
						<div className='input-label-container'>
							<label className='body-text input-label' htmlFor='totalBill'>
								Bill
							</label>
							<small className='body-text input-error' id='totalBillError'>
								Input field is valid
							</small>
						</div>
						<input
							value={billItems.bill}
							onChange={(e) => {
								setBillItems({
									...billItems,
									bill: validateInput(e.target.value),
								});
							}}
							type='number'
							className='body-l-text input-field'
							placeholder='0'
							name='Total bill value'
							id='totalBill'
						/>
					</div>

					<div className='input-group' id='totalTipPercentageGroup'>
						<div className='input-label-container'>
							<label className='body-text input-label'>Select Tip %</label>
							<small
								className='body-text input-error'
								id='totalTipPercentageError'
							>
								Input field is valid
							</small>
						</div>
						<div className='input-tips-container'>
							<button
								onClick={() => {
									setBillItems({ ...billItems, tip: 5 });
								}}
								className='body-l-text input-tip'
								id='tip5'
							>
								5%
							</button>
							<button
								onClick={() => setBillItems({ ...billItems, tip: 10 })}
								className='body-l-text input-tip'
								id='tip10'
							>
								10%
							</button>
							<button
								onClick={() => setBillItems({ ...billItems, tip: 15 })}
								className='body-l-text input-tip'
								id='tip15'
							>
								15%
							</button>
							<button
								onClick={() => setBillItems({ ...billItems, tip: 25 })}
								className='body-l-text input-tip'
								id='tip25'
							>
								25%
							</button>
							<button
								onClick={() => setBillItems({ ...billItems, tip: 50 })}
								className='body-l-text input-tip'
								id='tip50'
							>
								50%
							</button>
							<input
								value={billItems.tip}
								onChange={(e) =>
									setBillItems({
										...billItems,
										tip: validateInput(e.target.value, true),
									})
								}
								type='number'
								className='body-l-text input-field'
								placeholder='Custom'
								id='totalTipPercentage'
							></input>
						</div>
					</div>

					<div className='input-group' id='numberOfPeopleGroup'>
						<div className='input-label-container'>
							<label className='body-text input-label' htmlFor='numberOfPeople'>
								Number of People
							</label>
							<small className='body-text input-error' id='numberOfPeopleError'>
								Input field is valid
							</small>
						</div>
						<input
							value={billItems.people}
							onChange={(e) =>
								setBillItems({
									...billItems,
									people: validateInput(e.target.value, true),
								})
							}
							type='number'
							className='body-l-text input-field'
							placeholder='0'
							name='Number of people'
							id='numberOfPeople'
						/>
					</div>
				</div>
				<div className='card-right'>
					<section className='card-price-container'>
						<div>
							<b className='body-text card-price-title'>Tip Amount</b>
							<p className='body-s-text card-price-subtitle'>/ person</p>
						</div>
						<strong className='strong-text card-price-value' id='tipAmount'>
							${tipAmountByPerson}
						</strong>
					</section>
					<section className='card-price-container'>
						<div>
							<b className='body-text card-price-title'>Total</b>
							<p className='body-s-text card-price-subtitle'>/ person</p>
						</div>
						<strong className='strong-text card-price-value' id='totalPrice'>
							${totalAmountByPerson}
						</strong>
					</section>
					<button
						onClick={() => {
							setBillItems({ bill: '', tip: '', people: '' });
						}}
						className='btn btn-primary btn-reset'
					>
						Reset
					</button>
				</div>
			</section>
		</main>
	);
};

export default Calculator;
