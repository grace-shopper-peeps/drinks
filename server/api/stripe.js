// const router = require('express').Router()

// const session = await stripe.checkout.sessions.create({
//   payment_method_types: ['card'],
//   line_items: [{
//     name: 'T-shirt',
//     description: 'Comfortable cotton t-shirt',
//     images: ['https://example.com/t-shirt.png'],
//     amount: 500,
//     currency: 'usd',
//     quantity: 1,
//   }],
//   success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
//   cancel_url: 'https://example.com/cancel',
// });
// router.get('/secret', async (req, res, next) => {
//   try {
//     const intent = await stripe.paymentIntents.create({
//       amount: 1000,
//       currency: 'usd',
//       paymentMethodTypes: ['card'],
//       receiptEmail: 'jenny.rosen@example.com',
//     })
//     res.json({clientSecret: intent.client_secret})
//   } catch (err) {
//     console.log(err)
//     next(err)
//   }
// })
