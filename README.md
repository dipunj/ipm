Motivation
--------
This project aims to help hospitals digitalize their in-patient departments. In-patient department refers to the department of a hospital that handles patients who are being treated post-operation or are scheduled for a procedure.
- Built it primarily because I saw many doctors in my town still relying on paper logs and struggling with managing patients.

Overview
--------
- Manage multiple hospital buildings/branches.
- Supports 3 roles with varying priviliges: Operator, Manager, Admin.
- Restrict operator access to specific branches.
- Deactivate a user account.
- Create/view/modify building structure via web interface.
- Allows hard reset of the whole system and soft reset per branch.
- Backup branch structure (wards, beds) into a json file
- Restore system from a backup file.
- Manage admissions in a branch - admission time, discharge time, patient info, doctor name, comments and more.
- Helps manage credit and transactions - In rural India many patients arrive at the hospital without any form payment instrument and doctors are expected to give them a loan without a collateral, because well the patient may be dying. This is majorly a paper based log, which is quite haphazardly managed, given the urgency of the situation, later resulting in discrepancies/losses.
- Logs each and every change to admission and transaction data.
- Transaction data is never deleted, it is only updated before logging, so no operator/manager/admin can make a false modification, since change/deletion is logged. Unless the system is soft reset by the admin.
- Doesn't allow discharging an admission if the ledger is not settled.
- Allows operators to use the application on a per branch basis. Switching to another branch means that all branch specific interface would be applicable only to that building.


Developer Gains
--------

(what I learned during the 2 months building it)

- Why doesn't buildings.destroy\_all work, but buildings.all.destory\_all works (HABTM nested associations are read only)/
- Rails has inbuilt support for user models having password, just add has\_secure\_password call in the User model.
- how cookies work in Rails 6. Updated an answer on SO too.
- what is JWT and when to use it. Read blogs on where to store it, best practices etc.
- Structuring controllers and services.
- Catching errors raised in services directly in the controller and converting them to JSON.
- Having a single json handler allows consistent JSON response.
- querying on nested conditionally joined tables using ActiveRecord.
- Used some rails methods, for the very first time.
- Clearly understood the use for belongs\_to has\_many and other association constructs, 
- Understood what the API only mode for rails is meant for and what middleware to additionally enable for a different frontend.
- Stick to figaro for env management, no point in implementing that yourself. It's okay to use other gems/libraries!
- Typescript should not be used if the project is solo and needs to be done quickly.
- Implemented route based authorisation for the first time.
- Used to directly use axios request object before this project, now I make custom hooks for get and post, way more clean code.
- Vercel has implemented swr (stale while revalidate) RFC as a hook called useSWR, which is awesome way to fetch data from an external api (though discovered that a bit late).
- How to SSR when a page is behind authentication (with cookies).
- SSR is not the preferred way for such projects, unless we want SEO, so that web crawlers can crawl our pages.
- Nextjs 10: router.push() takes two arguments and for dynamic routes we must provide the 2nd arg (as) to ensure that the page is not unmounted and remounted - spent a solid time on this foolishness.
- Difference between \_app and \_document files in nextjs.
- How to implement dark mode toggle using CSS variables.
- apply dark background to body and not a containing div of full 100vw,100vh. Because if browser is allowed to scroll past the end, there would be a white background(body color) making it unpleasant.
- Improved CSS knowledge vastly, learnt about BEM. But the project was near deadline by then.


Open sourcing for anyone to reuse it if you find a doctor with a similar problem. The code can be vastly improved (evaded later typescript errors with any - bad practice)
But as the old saying goes:

> If you don't hate your code from yesterday, you aren't learning.

It's good, but there are improvements that can be made. But it works.


Deploy
--------
- For my clients' usecase, the application needed to be deployed on premises instead of cloud, hence the process is trivial.
