import { Button, Typography } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({bookedVehicle}) => {
    const stripe = useStripe();
    const [disabledButton, setDisabledButton] = useState(false)
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const {_id,cost, userEmail, userName} = bookedVehicle;
    const [clientSecret, setClientSecret] = useState('');
    
    useEffect(()=>{
        console.log(cost)
        fetch('http://localhost:5000/create-payment-intent',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({cost})
        })
        .then(res=>res.json())
        .then(data=>{
            if(data?.clientSecret){
                setClientSecret(data.clientSecret);
            }
        })
        
    },[cost])
    const handleSubmit =async (event) =>{
        
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        setCardError(error?.message || '');
        setSuccess('');
        setProcessing(true)

        //CONFIRM CARD PAYMENT
        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: userName,
                  email: userEmail
                },
              },
            },
          );

          if(intentError){
              setCardError(intentError?.message);
              setProcessing(false)
              setDisabledButton(false)
          }else{
              setCardError('');
              setTransactionId(paymentIntent.id)
              setSuccess('Congrats! Your payment is Completed');

              //store payment on DB
              const payment = {
                  bookedVehicle: _id,
                  transactionId: paymentIntent.id
              }
              fetch(`http://localhost:5000/booking/${_id}`,{
                  method: 'PATCH',
                  headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(payment)
              })
              .then(res=>res.json())
              .then(data=> {
                  setProcessing(false)
                  setDisabledButton(false)
                })

          }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                            },
                            invalid: {
                            color: '#9e2146',
                            },
                        },
                    }}
                />
                <Button sx={{mt:2}} variant="contained" type="submit" disabled={!stripe || !clientSecret || success || disabledButton}>
                    Pay
                </Button>
            </form>
            {
                cardError && <Typography color='red'>{cardError}</Typography>
            }
            {
                success && <div className='text-green-500'>
                    <p>{success} </p>
                    <p>Your Transaction ID: <span className='text-orange-500 font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;