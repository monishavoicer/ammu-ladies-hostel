# Ammu Ladies Hostel website

A simple website built with plain HTML, CSS and JavaScript. No installation needed.

## Folder structure

```
ammu-ladies-hostel/
├── index.html      The page content
├── style.css       Colours, fonts and layout
├── script.js       Phone/WhatsApp details, menu, FAQ, form
├── README.md       This guide
└── images/
    ├── logo.png                         Your logo (trimmed margins only)
    ├── favicon.png                      Browser tab icon
    ├── hero-girl.jpg                    Home page hero image
    ├── room-two-bunks-ac-blue-cabinets.jpg   Gallery photo
    ├── room-bunk-beds-window-1.jpg      Shared room (also in About)
    ├── room-bunk-beds-window-2.jpg      Shared room
    ├── room-large-dormitory.jpg         Large shared room
    ├── room-storage-wardrobe.jpg        Wardrobe and cabinets
    ├── terrace-seating-area.jpg         Covered terrace
    ├── room-blue-cabinets-bunk-bed.jpg  Low-resolution photo
    └── room-ac-bunk-bed.jpg             Low-resolution photo
```

Keep all files together exactly like this, with the `images` folder next to `index.html`.

## Preview on your computer

1. Unzip the folder.
2. Double-click `index.html`. It opens in your browser.
3. After editing a file, save it and refresh the browser.

## What to edit later

| I want to change | Where |
|---|---|
| Phone number, WhatsApp number or message, map links | Top of `script.js` (`CONFIG`). Also update the phone number shown in `index.html` (search for `074187 58696`). |
| Rent prices | In `index.html`, search for `Contact us for current rent and availability` and replace it on each room card. |
| Branch maps, directions and Google profile links | The two branch cards in the Location section of `index.html`. Each uses the exact latitude and longitude of the Google Maps pin. The maps need an internet connection. |
| Second phone number | `CONFIG.phone2*` in `script.js`, plus the numbers in `index.html` (search `99401 22916`) |
| Home page girl image | Replace `images/hero-girl.jpg` (keep the name) |
| Colours | Top of `style.css` (`:root`) |
| A photo | Replace the file in `images/` using the same name, or change the filename in `index.html`. Keep photos about 1200 px wide for fast loading. |
| Photo captions or "Terrace seating area" label | The Gallery section of `index.html`. Rename it to "Study Hall" only if that is what it is. |

Rooms are not tagged as four-sharing or six-sharing in the photos because the photos do not show that. Add captions once you know.

## The enquiry form

GitHub Pages only hosts static files, so it cannot receive form submissions by itself. The form here checks the name and phone number, then opens WhatsApp with the details filled in. Nothing is saved or emailed.

To receive submissions by email or in a dashboard, use a form service such as Formspree or Web3Forms:

1. Create a free account and a new form to get a form URL.
2. In `index.html`, change `<form class="form card" id="form" novalidate>` to include `action="YOUR_FORM_URL" method="POST"`.
3. In `script.js`, remove the `form.addEventListener("submit", ...)` block, or change it to send the data with `fetch`. The service's documentation shows how.

## Publish with GitHub Pages

1. Create an account at github.com and sign in.
2. Click **+** (top right) then **New repository**. Name it `ammu-ladies-hostel`, choose **Public**, and click **Create repository**.
3. On the new repository page click **uploading an existing file**.
4. Open the unzipped folder and drag in **everything inside it**: `index.html`, `style.css`, `script.js`, `README.md` and the `images` folder. (Drag the contents, not the outer folder.)
5. Click **Commit changes**.
6. Go to **Settings**, then **Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**, then **Save**.
7. Wait one to two minutes and refresh. Your site address appears at the top: `https://YOUR-USERNAME.github.io/ammu-ladies-hostel/`.

## Update the site later

1. Edit the file on your computer and save it.
2. On GitHub open your repository, click **Add file**, then **Upload files**.
3. Drag the changed files in (same names replace the old ones) and click **Commit changes**.
4. Wait a minute and refresh the live site. You may need to press Ctrl+F5 to see changes.

You can also click a file on GitHub, then the pencil icon, to edit it in the browser.

## Connect a custom domain later

1. Buy a domain from a registrar.
2. In the repository go to **Settings**, then **Pages**, enter your domain under **Custom domain** and save.
3. At your registrar add the DNS records GitHub shows on that page (four `A` records for the root domain, or a `CNAME` for `www` pointing to `YOUR-USERNAME.github.io`).
4. Wait for DNS to update, then tick **Enforce HTTPS**.

After you have a domain, add its address as `"url"` in the structured data near the top of `index.html`, and add a `<link rel="canonical">` tag.

## Notes

- Facts come from what you supplied: address, two phone numbers, the poster (4, 6 and 8 sharing, ₹6,500 offer, facilities) and three Google review quotes. Check every claim is accurate before publishing.
- The Google rating is shown as text. The site does not add review markup to the structured data, so no review or rating is claimed to search engines.
