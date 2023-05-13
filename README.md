<h1 align="center">Open Source Online exam system for all your testing needs for assessment, recruitment, selection and certifications. 🖥️</h1>
<br>

## Features

- Open new positions and make it possible for candidates to apply

- Automatically assign questionnaires and tests for candidates

- Check for candidate history and avoid forcing them to retake same questionnaires if they are re-applying for new positions!

## Contributing
Feel like contributing? That's awesome!

Thanks for showing interest to contribute to RecruitEm 💖, you rock!

There are different ways you can contribute, all of which are valuable:
- Fork the project
- Take on one of active issues
- Make a pull request

[Here are a few guidelines](CONTRIBUTING.md) that should help you as you prepare to make your contribution.

If you have any questions, feel free to contact us on Github discussions or issues page.

We are always active on discord server.

If you like the project, but don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer to this project in your project's README
> - Share on your socials ([Facebook](https://www.facebook.com/profile.php?id=100088394168553), [Instagram](https://www.instagram.com/evilbeesdev/), [TikTok](https://www.tiktok.com/@evilbeesdev), [YouTube](https://www.youtube.com/@evilbees), [LinkedIn](https://www.linkedin.com/company/evil-bees/))
> - Mention the project at local meetups and tell your friends/colleagues

## Style Guide
- This project uses [Tailwind](https://tailwindcss.com/) on the front end. Please avoid using inline and scss styles unless absolutely necessary.

## Formatting
- We use [Prettier+](https://prettier.io/) to format .js files.

## Usage

Edit .env.local file:

```bash
MONGODB_URI="URL FOR MONGO DATABASE" 
SITE_URI="http://localhost:3000"

#FOR AUTH CHANGE THIS WITH RANDOM STRINGS FOR HASHING.
NEXTAUTH_JWT_SECRET="b4ed764b60a9a9be8452f06ca06519f9"
NEXTAUTH_SECRET="b4ed764b60a9a9be8452f06ca06519f9"
```

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```
* To avoid merge conflicts, please pull from the main branch before making any changes.
```
