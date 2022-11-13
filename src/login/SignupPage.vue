<template>
  <div class="container vue-tempalte">
    <div v-if="registered">
      <h2>You're registered successfully!</h2>
      <p>Please check your email for confirmation.</p>
      <p>Click <router-link to="/">here</router-link> to visit our home page.</p>
    </div>
    <form v-if="!registered" v-on:submit.prevent @submit="signup()">
      <h2>Sign Up</h2>

      <div class="form-group">
        <label for="username">Username <span class="text-danger">*</span></label>
        <input
          id="username"
          name="username"
          v-model.trim="newUser.username"
          type="text"
          class="form-control form-control-sm"
          required
        />
        <ul>
          <li v-for="(m, index) in invalidEntry.username" :key="index" class="text-danger">
            {{ m }}
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label for="email">Email address <span class="text-danger">*</span></label>
        <input
          id="email"
          name="email"
          v-model.trim="newUser.email"
          type="email"
          class="form-control form-control-sm"
          required
        />
        <ul>
          <li v-for="(m, index) in invalidEntry.email" :key="index" class="text-danger">{{ m }}</li>
        </ul>
      </div>

      <div class="form-group">
        <label for="email">Organization Type<span class="text-danger">*</span></label>
        <select
          id="company"
          name="company"
          v-model="newUser.accountType"
          type="text"
          class="form-control form-control-sm"
          required
        >
          <option :value="null">Please Select</option>
          <option value="accommodation">Accommodation</option>
          <option value="to">Tour Operator</option>
          <option value="other" disabled>Other</option>
        </select>
        <ul>
          <li v-for="(m, index) in invalidEntry.accountType" :key="index" class="text-danger">
            {{ m }}
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label for="tel">Phone Number <span class="text-danger">*</span></label>
        <input
          v-model.trim="newUser.phone"
          type="tel"
          id="tel"
          name="tel"
          class="form-control form-control-sm"
          required
        />
        <ul>
          <li v-for="(m, index) in invalidEntry.phone" :key="index" class="text-danger">{{ m }}</li>
        </ul>
      </div>

      <div class="form-group">
        <label>Country <span class="text-danger">*</span></label>
        <select class="form-control" name="country" id="country" v-model="newUser.country" required>
          <option value="null">--Select Country--</option>
          <option v-for="(k, index) in countries" :key="index" :value="k.iso2">
            {{ k.name }}
          </option>
        </select>
        <ul>
          <li v-for="(m, index) in invalidEntry.country" :key="index" class="text-danger">
            {{ m }}
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label>Password <span class="text-danger"> *</span></label>
        <input
          v-model="newUser.password"
          type="password"
          class="form-control form-control-sm"
          required
        />
        <ul>
          <li v-for="(m, index) in invalidEntry.password" :key="index" class="text-danger">
            {{ m }}
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label>Retype Password <span class="text-danger"> *</span></label>
        <input
          v-model="newUser.rePassword"
          type="password"
          class="form-control form-control-sm"
          required
        />
      </div>
      <ul>
        <li v-for="(m, index) in invalidEntry.nonFieldErrors" :key="index" class="text-danger">
          {{ m }}
        </li>
      </ul>
      <div class="form-group row" style="justify-content: center">
        <div class="">
          <b-form-checkbox
            v-model="newUser.userAgree"
            value="true"
            unchecked-value="false"
            disabled
          >
          </b-form-checkbox>
        </div>
        <div>
          <a
            style="
              font-weight: 600;
              font-size: 13px;
              cursor: pointer;
              color: blue;
              text-decoration: underline;
            "
            @click="userAgreement()"
            >Click to view and sign user agreement</a
          >
        </div>
        <ul>
          <li v-for="index in invalidEntry.userAgree" :key="index" class="text-danger">
            {{ index }}
          </li>
        </ul>
      </div>
      <button type="submit" class="btn btn-dark btn-sm btn-block" style="margin-top: 15px">
        Sign Up <span v-if="isLoading" class="spinner-border"></span>
      </button>

      <p class="forgot-password text-right" style="margin-top: 10px">
        Already registered
        <router-link to="/login/">sign in?</router-link>
      </p>
    </form>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="userAgreePop">
        <div class="modal" style="overflow: scroll">
          <header class="modalheader">
            <div class="modalheaderback">
              <svg
                width="100%"
                height="100"
                viewBox="0 0 617 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M404.455 250.978L454.886 250.978L480.102 207.303L454.886 163.628L404.455 163.628L379.239 207.303L404.455 250.978Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M404.455 163.633L454.886 163.633L480.102 119.958L454.886 76.2833L404.455 76.2833L379.239 119.958L404.455 163.633Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M253.15 250.978L303.581 250.978L328.797 207.303L303.581 163.628L253.15 163.628L227.935 207.303L253.15 250.978Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M110.276 236.421L143.897 236.421L160.707 207.304L143.897 178.188L110.276 178.188L93.4656 207.304L110.276 236.421Z"
                  stroke="#8eafef"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M101.857 250.978L152.288 250.978L177.504 207.303L152.288 163.628L101.857 163.628L76.6418 207.303L101.857 250.978Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M26.2167 207.302L76.6477 207.302L101.863 163.631L76.6478 119.956L26.2167 119.956L1.00111 163.631L26.2167 207.302Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M253.15 163.633L303.581 163.633L328.797 119.958L303.581 76.2833L253.15 76.2833L227.935 119.958L253.15 163.633Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M555.732 163.633L606.163 163.633L631.379 119.958L606.163 76.2833L555.732 76.2833L530.517 119.958L555.732 163.633Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M555.732 76.2795L606.163 76.2795L631.379 32.6049L606.163 -11.0698L555.732 -11.0698L530.517 32.6049L555.732 76.2795Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M480.095 207.302L530.523 207.302L555.738 163.631L530.523 119.956L480.095 119.956L454.88 163.631L480.095 207.302Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M631.391 207.302L681.822 207.302L707.037 163.631L681.822 119.956L631.391 119.956L606.175 163.631L631.391 207.302Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M328.803 207.302L379.234 207.302L404.449 163.631L379.234 119.956L328.803 119.956L303.587 163.631L328.803 207.302Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M328.803 32.6077L379.234 32.6077L404.449 -11.067L379.234 -54.7381L328.803 -54.7381L303.587 -11.067L328.803 32.6077Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M328.803 119.956L379.234 119.956L404.449 76.2809L379.234 32.6063L328.803 32.6063L303.587 76.2809L328.803 119.956Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M177.509 119.956L227.937 119.956L253.152 76.2809L227.937 32.6063L177.509 32.6063L152.29 76.2809L177.509 119.956Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M404.449 163.632L454.88 163.629L480.099 207.296L530.523 207.3L555.738 250.974L530.523 294.649L480.092 294.649L454.88 338.324L404.442 338.324L379.233 294.649L404.449 250.974"
                  stroke="#8eafef"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
              </svg>
            </div>
            <div class="partnerhead">
              <div class="row">
                <div class="col">
                  <h4 size="24" color="#34404E" class="">Hotel Facts User Agreement</h4>
                </div>
              </div>
            </div>
          </header>
          <div class="modalcontainer">
            <p style="text-align-last: right">Scroll to the bottom</p>
            <b-card>
              Terms of Service & Data Processing Agreement Ananas provides its service to you
              subject to the following terms Ananas Services Agreement

              <div>
                This Services Agreement (the “Agreement”) is by and between you (“User” or
                “you”/“your”) and Ananas Company LTD (A.K.A. HotelFacts.net and its variant modules
                published by the company), a Red sea limited liability company located at 50 Airport
                block road, Hurghada, Red Sea 85400, EGY (“Ananas” or “we”/“our”/“us”). By using all
                or any part of the services described in this Agreement and/or by creating an
                account with Ananas (a “User Account”), you represent that you accept and will
                comply with all of the terms of this Agreement, including all documents, policies
                and supplemental terms referred to within it, which are incorporated into this
                Agreement. If you are entering into this Agreement on behalf of a company or other
                legal entity, you represent that you have the authority to bind such entity to the
                terms of this Agreement, in which case “User” and “you” shall refer to such entity.
                Together, Ananas and the User will be referred to in this Agreement as the
                “Parties”.
              </div>

              <div>1. The Services</div>

              <div>
                1.1 Ananas provides various services to Accommodations, Tour Operators and
                affiliates of travel and touristic services, including but not limited to Hotels,
                Resorts, accommodation, accommodation and/or any type of event (collectively
                referred to as “Travel Products”).
              </div>

              <div>
                1.2 The services provided by Ananas may include (but are not limited to) the
                following:
              </div>

              <div>
                1.2.1 access to a daily stop sale management and blocked days productivity system,
                including but not limited to tour operators.
              </div>
              <div>
                1.2.2 access to other users of Ananas’s online partner connectvity (Ananas partner
                contract), and the opportunity to enter into contracts with such users to provide
                them with your accommodation data or aqcuire data shared by those other users.
              </div>
              <div>
                1.2.3 access to travel agencies and other distribution channels, through which you
                may provide your stop sale feed, room availability, retail prices and hotel facts
                sheet. all of which you provide and offer to other users (subject to the terms you
                provide and set of options you may select or subject to terms of business of those
                agencies and channels).
              </div>
              <div>
                1.2.4 the opportunity to participate in Ananas’s affiliate marketing hub, through
                which you can permit other users of the Ananas Marketplace to promote your
                accommodation data and drive bookings, based on data you provided on Ananas platform
                ,thus it holds you resbonsilbe to the reliability and genuinity of the data provided
                into database. and Ananas Platform is not responsible for any incorrect data
                provided by your side.
              </div>

              <div>
                1.3 All of the services described in Section 1.2 and any other services that may be
                provided by Ananas from time to time (including the Ananas APIs) shall be referred
                to as the “Services”. Additional terms may apply to the provision of certain
                Services (“Supplemental Terms”), and such Supplemental Terms shall be incorporated
                within the terms of this Agreement.
              </div>

              <div>
                1.4 You acknowledge and agree that you have the following additional
                responsibilities if you subscribe to the Ananas Website Service:
              </div>

              <div>
                1.4.1 You will be solely responsible for all activities conducted on or through any
                website provided through the Ananas Website Service (a “Ananas Website”), whether or
                not authorized by you and any transactions or interactions with end users of the
                Ananas Website. You will be solely responsible for providing end users of the Ananas
                Website with any applicable terms of use and privacy policy, including any required
                disclosure or explanation of the features of the Ananas Website and any goods or
                services offered through the Ananas Website. You will also be solely responsible for
                ensuring that the Ananas Website is fully compliant at all times with all applicable
                laws, including but not limited to through its use of cookies, web beacons and any
                other tracking technologies.
              </div>
              <div>
                1.4.2 It is solely your responsibility to provide any User Content, information,
                equipment or software that may be necessary for you to use the Ananas Website
                Service.
              </div>
              <div>
                1.4.3 You have sole responsibility for backing up all User Content. Ananas shall in
                no circumstances be responsible for the loss of any User Content.
              </div>
              <div>
                1.4.4 You will use your best efforts to ensure that the User Content and Ananas
                Website are and will at all times remain free of all computer viruses, worms, Trojan
                horses and other malicious code.
              </div>

              <div>
                1.5 All Services are provided “as-is” and Ananas assumes no responsibility for the
                timeliness, deletion, misdelivery or failure to store any User communications,
                personalisation settings or content, information or other data. You are responsible
                for obtaining access to the Services, and that access may involve third party fees
                (such as Internet service provider or airtime charges). You alone are responsible
                for all such fees. In addition, you must provide, and are responsible for, all
                equipment necessary to access the Services. You agree to use the Services in a
                manner consistent with all applicable laws and regulations and in accordance with
                the terms of this Agreement.
              </div>

              <div>
                1.6 Ananas reserves the right at any time to amend, suspend or discontinue any one
                or more of the Services, with or without notice. You agree that Ananas shall not be
                liable to you or any third party for any such amendments, suspension or
                discontinuance of any Service.
              </div>

              <div>
                1.7 Ananas may at any time and from time to time establish general practices and
                limits concerning use of the Services, including without limitation the maximum disk
                space, bandwidth, volume of Ananas API calls and server processing that will be
                allotted on Ananas’s servers on your behalf, and the maximum number of times (and
                the maximum duration for which) you and your customers and/or agents may access the
                Services in a given period. You will comply with such practices and limits. You may
                not reverse engineer, decompile or disassemble any Software. Ananas takes no
                responsibility or liability for the deletion or failure to retain any messages and
                other communication or content, information or other data maintained or transmitted
                by the Services. These general practices may be amended and modified by Ananas from
                time to time with or without notice to you.
              </div>

              <div>
                1.8 Your access to and use of any application programming interfaces (APIs) provided
                to you by Ananas (the "Ananas API") is governed by the Ananas API Terms
                <a href="#">https://hotelfacts.net/legal/api-terms</a>, which are incorporated
                herein by reference.
              </div>

              <div>2. User Account</div>

              <div>
                2.1 To access and use one or more of the Services, you will have to create an
                account (“User Account”).
              </div>

              <div>
                2.2 If you are an individual, you must be at least 18 years old, and legally able to
                carry out your business in your jurisdiction. You confirm that you will use the
                Services solely for the purposes of carrying on a business activity and not for any
                personal, household or family purpose. If you sign up for a User Account on behalf
                of your employer, your employer will be deemed to be the User for the purpose of
                this Agreement, and you represent and warrant that you have the authority to bind
                your employer to this Agreement. Each User is responsible for: (a) ensuring that its
                employees, agents and subcontractors comply with this Agreement and (b) any breach
                of this Agreement by User’s employees, agents or subcontractors.
              </div>

              <div>
                2.3 You shall ensure that all information you provide to Ananas in connection with
                your User Account and use of the Services is at all times accurate, complete and
                up-to-date.
              </div>

              <div>
                2.4 You are solely responsible for maintaining the confidentiality of your password
                and other User Account information. You are fully responsible and liable for all
                activities on your User Account (including any sub-accounts as described in Section
                2.4).
              </div>

              <div>
                <!-- #TODO -->
                2.5 If you are granted permission by Ananas to create sub-accounts within your User
                Account, such sub-accounts may be created solely for members of your organization,
                and not for any third parties.
              </div>

              <div>
                2.6 You shall immediately notify Ananas of any unauthorised use of your User
                Account, password or any other breach of security.
              </div>

              <div>
                2.7 You shall ensure that you exit and log off your User Account at the end of each
                usage session. Ananas will not be liable for any loss or damage arising from your
                failure to comply with this Section 2.
              </div>

              <div>3. Fees and Payments</div>

              <div>
                3.1 General. Fees of service are not obligatory for each user of the platform, nor
                obligatory to pay to use the modules provided to hotels. Premium subscription is not
                obligatory and remains as optional to unlock certain features within the platform
                which may add value to your property or you as a user. however the core principle of
                the platform to provide reliable service free of charge for each verified account
                whether you use premium service or free service. Premium Subscription (Not
                obligatory) fees are applicable to (a) Accommodation, Property, Hotel, Resort,
                Villa, Residental complex, Home rental, Holiday House, Summer House, Holiday
                facility, city-break location, Camping rentals, and Travel Agencies, 3rd party
                affiliate (b) Business service fees are charged for Tour Operators, Direct IBE
                (Internet Booking Engine), and Web platforms serving as booking engine either
                automatically or by help of a human agent. Business service fees are charged for
                exclusive service provided for the counter party and contracted as per deal for each
                entity and it holds additional agreement between Ananas and the counter party. (c)
                Together, the Subscription Fees, the Service Fees, and the Additional Fees are
                referred to as the “Fees”.
              </div>

              <div>
                3.2 Payment Method. You must keep a valid payment method on file with Ananas to pay
                for all incurred and recurring Fees. Ananas will charge applicable Fees to any valid
                payment method that you authorize within your User Account (the “Authorized Payment
                Method”), and Ananas will continue to charge the Authorized Payment Method for
                applicable Fees until all outstanding Fees have been paid in full.
              </div>

              <div>
                3.3 Subscription Fees. The Subscription Fees are charged in advance on a recurring
                basis (except where may otherwise have been agreed with you). Accordingly, where
                applicable, Ananas will attempt to automatically renew the Services on a
                monthly/yearly basis (each month being a “Billing Period”), and will automatically
                charge you the applicable Subscription Fees using the Authorized Payment Method. If
                you wish to stop using one or more Service, you need to notify Ananas within your
                User Account at least two (2) business days prior to the start of the next Billing
                Period. We will then remove your access to such Service(s) from the end of your last
                Billing Period.
              </div>

              <div>
                3.4 Free Trials. Ananas may sometimes offer the opportunity to utilize one or more
                Services for free (or partially free) for a limited period of time (“Free Trial”).
                If you are participating in a Free Trial, you shall have the right to use such
                Service(s) for the duration of the Free Trial without charge (or, as applicable,
                with the limited charges specified) until the expiration date of the Free Trial.
                Unless you notify Ananas by email that you do not wish to subscribe to such
                Service(s) at least two (2) business days prior to such expiration date, Ananas may
                automatically charge you for your first payment the day following expiry of the Free
                Trial, and your subscription to the Service(s) shall then begin on the basis of the
                standard Fees.
              </div>

              <div>
                3.5 Service Fees. Ananas may offer you a choice of how to pay the Service Fees. If
                you choose to be invoiced by Ananas for the Service Fees on a monthly basis, Section
                3.5 (a) – (c) shall apply. If you choose to pay the Service Fees using “Ananas Pay”,
                Section 3.6 shall apply.
              </div>

              <div>
                (a) Ananas shall send an invoice for the Fees to you at the beginning of each month,
                based on value debited and billing date).
              </div>
              <div>
                (b) Each invoice submitted by Ananas shall be paid in full by you by credit card.
                You are required to submit your credit card details before being invoiced by Ananas.
              </div>

              <div>
                3.6 Ananas Pay. If you choose to pay the Service Fees using “Ananas Pay”, you will
                be required to create an account with a third party payment provider, subject to
                separate terms and conditions with such third party (the “Ananas Pay Provider”). You
                agree to be bound by the Ananas Pay Provider’s terms and conditions.
              </div>

              <div>
                3.7 Changes to Fees. Ananas reserves the right to increase the Fees from time to
                time with effect from the following month by providing you with no less than 30
                days’ notice. For the avoidance of doubt, Ananas does not need to notify you if we
                decide to raise the price of a Service for which you are not subscribed.
              </div>

              <div>
                3.8 Ananas will not charge you extra payment in case if subscription value has
                increased and you/your has already paid long period in advance, and there won't be
                any limitation to your current subscription or removal of features from your
                subscripted premium package. however if higher package would be introduced/promoted
                including other features that your original package did not include, and you may
                wish to upgrade to new/higher package you should contact Ananas team via business
                mail expressing your upgrade plan within at least (2) business days before new
                subscription billing date, Ananas admin will assis in upgrading your package and
                cutting loses in cost due to changing your package.
              </div>

              <div>3.9 Taxes.</div>

              <div>3.9.1 All amounts payable under this Agreement:</div>

              <div>
                (a) will be exclusive of any applicable sales, use, excise, value added tax, or
                other tax or amount which may be levied on the Services provided for under this
                Agreement. Where applicable, taxes payable will be reflected as separate items on
                invoices, which will include a detailed description of such tax.
              </div>

              <div>
                (b) shall be paid in full without any deductions except where the payor is required
                by law to deduct withholding tax from sums payable to the payee and remit to the
                local tax authorities. Payor shall promptly provide to payee any proof of such
                remittances to the local tax authorities, including receipts issued from the
                appropriate tax regulatory authority or any other relevant documentation evidencing
                payment of any amounts deducted pursuant to this clause.
              </div>

              <div>
                3.9.2 There may be additional terms and conditions relating to taxes that are set
                out in the Supplemental Terms. It is your responsibility to ensure that you comply
                with all such additional terms.
              </div>

              <div>4. Intellectual Property Rights</div>

              <div>
                4.1 Ananas’s intellectual property rights in or arising out of the Services shall at
                all times be the property of Ananas. Nothing in this Agreement shall be regarded as
                the assignment of any such intellectual property rights to you.
              </div>

              <div>
                4.2 Any intellectual property rights in or arising out of the Services that may be
                owned by third parties shall at all times remain with such third parties.
              </div>

              <div>5. User Content</div>

              <div>
                5.1 Ananas does not claim ownership of any content that is submitted to or otherwise
                made available by you for the use of any part of the Services (the “User Content”).
                The User Content includes, but is not limited to: information, data, text, software,
                music, sound, photographs, graphics, video, messages, goods, products, services or
                other materials. You are fully responsible for all of your User Content, including
                for archiving and backing up your User Content frequently.
              </div>

              <div>
                5.2 You grant Ananas a worldwide, royalty-free and non-exclusive license to use,
                distribute, reproduce, modify, adapt, publicly perform and publicly display your
                User Content for the purposes of providing the Services. The license exists only for
                as long as you elect to continue to include such User Content on or within the
                Services and will terminate at the time the User removes such User Content from the
                Services and/or terminates this Agreement.
              </div>

              <div>
                5.3 By using the Services, you agree that Ananas may use your name and logo in
                presentations, marketing material, client lists, financial reports and on websites
                listing Ananas’s customers. If, pursuant to the provision of the Ananas Website
                Service, Ananas makes an icon available to you incorporating the words “powered by
                Ananas” (or similar) (the “Icon”), Ananas grants to you a limited, royalty-free and
                non-exclusive license to use the Ananas name solely as incorporated within such Icon
                for the purposes of displaying the Icon on your Ananas Website.
              </div>

              <div>
                5.4 You agree not to upload, transmit or otherwise make available in connection with
                the Services any User Content that is unlawful, subject to third party property
                rights, harmful, threating, abusive, harassing, torturous, defamatory, vulgar,
                obscene, libellous, invasive of another person’s privacy, hateful, racist or
                otherwise objectionable.
              </div>

              <div>
                5.5 If Ananas becomes aware of any User Content violating Section 5.4 of this
                Agreement, Ananas reserves the right to remove any such User Content from the
                Services.
              </div>

              <div>
                5.6 Under no circumstances will Ananas be liable for the User Content, including but
                not limited to, for any errors or omissions in User Content, or for any loss or
                damage of any kind incurred as a result of the use of any User Content posted,
                transmitted or otherwise made available via the Services. You bear all risks
                associated with the use of any of your User Content.
              </div>

              <div>6. Third Party Services</div>

              <div>
                6.1 Ananas may from time to time recommend, provide you with access to, and/or
                enable your use of third party software, applications, products, services or website
                links (collectively, “Third Party Services”), including via the Ananas App Store.
                Such Third Party Services are made available only as a convenience, and your
                purchase, access or use of any such Third Party Services is solely between you and
                the provider of the applicable Third Party Services (each, a “Third Party
                Provider”). In addition to this Agreement, you also agree to be bound by the
                additional terms applicable to any Third Party Services you purchase from, or that
                are provided by, Third Party Providers.
              </div>

              <div>
                6.2 Any use by you of Third Party Services offered through the Services or through
                the Ananas App Store is entirely at your own risk and discretion, and it is your
                responsibility to read the terms and conditions and privacy policies applicable to
                such Third Party Services before using them. In some instances, Ananas may receive a
                revenue share from Third Party Providers whose Third Party Services you use. Ananas
                does not provide any warranties or make representations to you with respect to any
                Third Party Services. You acknowledge that Ananas has no control over Third Party
                Services and shall not be responsible or liable to you or anyone else for such Third
                Party Services.
              </div>

              <div>
                6.3 The availability of Third Party Services through the Services, including the
                Ananas App Store, or the integration or enabling of such Third Party Services with
                the Services does not constitute or imply an endorsement, authorization,
                sponsorship, or affiliation by or with Ananas. Ananas does not guarantee the
                availability of Third Party Services and you acknowledge that Ananas may disable
                access to any Third Party Services at any time in its sole discretion and without
                notice to you. Ananas is not responsible or liable to anyone for discontinuation or
                suspension of access to, or disablement of, any Third Party Service. Ananas strongly
                recommends that you seek specialist advice before using or relying on Third Party
                Services, to ensure they will meet your needs.
              </div>

              <div>
                6.4 If you install or enable a Third Party Service for use with the Services, you
                grant Ananas permission to allow the applicable Third Party Provider to access your
                data and other materials and to take any other actions as required for the
                interoperation of the Third Party Service with the Services, and any exchange of
                data or other materials or other interaction between you and the Third Party
                Provider is solely between you and such Third Party Provider. Ananas is not
                responsible for any disclosure, modification or deletion of your data or other
                materials, or for any corresponding losses or damages you may suffer, as a result of
                access by a Third Party Service or a Third Party Provider to your data or other
                materials.
              </div>

              <div>
                6.5 The relationship between you and any Third Party Provider is solely and strictly
                between you and such Third Party Provider, and Ananas has no obligation to intervene
                in any dispute arising between you and a Third Party Provider.
              </div>

              <div>
                6.6 Under no circumstances shall Ananas be liable for any direct, indirect,
                incidental, special, consequential, punitive, extraordinary, exemplary or any other
                damages or loss whatsoever, that result from any Third Party Services and/or your
                contractual relationship with any Third Party Provider. These limitations shall
                apply even if Ananas has been advised of the possibility of such damages. The
                foregoing limitations shall apply to the fullest extent permitted by applicable law.
              </div>

              <div>
                6.7 You agree to indemnify and hold Ananas, its affiliates, respective officers,
                directors and employees harmless from any claim or demand, including reasonable
                attorneys’ fees, arising out of your use of a Third Party Service and/or your
                relationship with a Third Party Provider.
              </div>

              <div>7. Confidentiality and Data Protection</div>

              <div>
                7.1 Any information disclosed by or on behalf of one Party to the other Party during
                the term of this Agreement that is identified as being proprietary and/or
                confidential or that, by the nature of the circumstances surrounding the disclosure,
                ought in good faith to be treated as proprietary and/or confidential, including,
                without limitation, all information pertaining to a Party’s business, technical
                processes and formulas, software, customer and prospective customer lists, product
                designs, sales, costs, unpublished price lists and other financial information,
                business plans, and marketing data, constitute “Confidential Information.” The Party
                receiving Confidential Information of the disclosing Party will maintain safeguards
                against its destruction, loss, alteration or disclosure, which safeguards shall be
                consistent with industry best practices and no less rigorous than the protections
                afforded by the receiving Party to its own proprietary information and will not,
                during or after the term of this Agreement, (a) use any such Confidential
                Information for any purpose other than to perform the receiving Party’s obligations
                or exercise the receiving Party’s rights under this Agreement and (b) disclose any
                such Confidential Information to any third party, other than disclosures made by
                Ananas pursuant to the activities contemplated in this Agreement. Notwithstanding
                the foregoing, the obligations of this Section 7 do not apply to information which
                is: (i) generally available to the public, without any obligation of
                confidentiality, other than by a breach of this Agreement by the receiving Party;
                (ii) rightfully received by the receiving Party from a third party without any
                obligation of confidentiality; (iii) independently developed by the receiving Party
                without reference to or reliance on the other Party’s Confidential Information; or
                (iv) generally made available to third parties by the disclosing Party without
                restriction on disclosure. Upon termination of this Agreement, or upon the
                disclosing Party’s earlier request, the receiving Party will return, or destroy and
                certify as such, all of the disclosing Party’s Confidential Information in the
                receiving Party’s possession or under the receiving Party’s control and will cease
                all use of such Confidential Information.
              </div>

              <div>
                7.2 In relation to the Services, each Party shall comply with all requirements of
                applicable data processing laws and regulations (the “Data Protection Legislation”).
                Each Party acknowledges that, for the purposes of the Data Protection Legislation,
                you are the data controller and Ananas is the data processor. For the avoidance of
                doubt, you may not use any personal information (including e-mail addresses or other
                contact details) that is collected or acquired through your use of the Services in
                any way unless you have the lawful right to do so.
              </div>

              <div>
                7.3 The Parties agree to the terms of the data processing agreement set forth in
                Annex 1 (the “Data Processing Agreement”) in relation with Ananas’s processing of
                personal data on your behalf.
              </div>

              <div>8. Record Retention</div>

              <div>
                Ananas shall compile and retain records of transactions, User Content and data
                related to the Services provided to you. You acknowledge and agree that Ananas may
                preserve, delete, and/or disclose any of the foregoing if required to do so by law
                or in the good faith believe that such preservation, deletion or disclosure is
                reasonably necessary to: a) comply with legal process; b) enforce this Agreement; or
                c) defend Ananas’s rights and/or those of any third parties.
              </div>

              <div>9. Limitation of Liability</div>

              <div>9.1 All usage of the Services is at your own risk.</div>

              <div>
                9.2 Neither Ananas nor its affiliates, nor any of their respective officers,
                directors, members, shareholders, employees, agents, third party content providers,
                or licensors warrant that the Services or the Software will be uninterrupted,
                timely, secure or error-free, nor do they provide any warranty as to (a) the results
                that may be obtained from the use of any Service or the Software including their
                accuracy, reliability, quality, adequacy, timeliness or authenticity; or (b) the
                accuracy, reliability, quality, adequacy, timeliness or authenticity of any
                advertisements, information, services, products, merchandise and/or other material
                that is purchased through or provided via the Services. The Services and the
                Software are provided on an “as is” and “as available” basis without warranties of
                any kind, either express or implied, including, but not limited to, warranties of
                merchantability, non-infringement or fitness for a particular purpose.
              </div>

              <div>
                9.3 In no event will Ananas, or any person or entity involved in creating, producing
                or distributing the Services or Software, be liable to you or to any other person or
                entity for any indirect, incidental, special, punitive or consequential damages, or
                loss of profit or revenue arising out of the use of or inability to use the Services
                or Software (including the Ananas APIs), including but not limited to losses
                incurred as a result of the modification of content or the failure of any content to
                transfer to a Ananas Website, any decrease in web traffic, SEO ranking, or any other
                impact on your business, whether financial or otherwise. This disclaimer of
                liability applies to any damages or injury caused by any failure of performance,
                error, omission, interruption, deletion, defect, delay in operation or transmission,
                computer virus, communication line failure, theft or destruction or unauthorized
                access to, alteration of, or use of record, whether for breach of contract, tortious
                behaviour, negligence, or under any other cause of action regardless of whether
                Ananas had notice of the cause or such cause was foreseeable. These disclaimers and
                limitations shall apply even in the event of a fundamental or material breach or a
                breach of the fundamental or material terms of this Agreement. To the maximum extent
                permitted by law, Ananas’s liability to you under this Agreement shall be limited to
                the Service Fees paid by you to Ananas in the six (6) months immediately preceding
                the date the cause of action arose.
              </div>

              <div>
                9.4 You agree to indemnify and hold harmless Ananas, its affiliates, respective
                officers, directors and employees, from and against any and all claims of third
                parties relating to, arising out of or resulting from use of the Services and
                Software (including the Ananas APIs), other than claims arising from gross
                negligence or wilful misconduct of Ananas, its affiliates, respective officers,
                directors and/or employees.
              </div>

              <div>
                9.5 By using any Service and agreeing to this Agreement, you acknowledge that you
                have not relied on any prior representation, warranty or other assurance made by or
                on behalf of Ananas, and you waive all rights and remedies which might otherwise be
                available to you in respect of such representation, warranty or other assurance,
                provided that nothing in this Section shall exclude or limit any liability for
                fraud.
              </div>

              <div>10. Suspension and Termination</div>

              <div>
                10.1 Without affecting any other right or remedy available to it, either Party may
                terminate this Agreement at any time. If you wish to terminate this Agreement, you
                must do so by notifying us through your User Account. Ananas may suspend and/or
                terminate any one or more of the Services at any time without notice.
              </div>

              <div>
                10.2 Ananas may terminate the Services with immediate effect by giving written
                notice to you if:
              </div>

              <div>
                10.2.1 you commit a material breach of any of the provisions of this Agreement; or
              </div>

              <div>
                10.2.2 you become insolvent, cease to trade or have a liquidator, receiver, manager,
                administrator or administrative receiver or similar officer appointed in respect of
                the whole or part of your business, or enter into any arrangement or composition
                with your creditors, or are made bankrupt, or undergo a similar or analogous event
                in any jurisdiction;
              </div>

              <div>
                10.2.3 you fail to pay any amount due and payable pursuant to Section 3, after
                Ananas has sent you a notification of payment failure; or
              </div>

              <div>
                10.2.4 your User Account has been inactive for a period of ninety (90) days or more;
                or
              </div>

              <div>
                10.2.5 if you object to the use of any sub-processor according to the Data
                Processing Agreement.
              </div>

              <div>
                10.3 Upon termination, Ananas may in its sole discretion close your User Account,
                delete any existing data from your User Account, and refuse any future submission of
                data from you.
              </div>

              <div>10.4 Upon termination, all unpaid Fees shall become due and payable.</div>

              <div>11. Amendments to Agreement</div>

              <div>
                Ananas may update or replace this Agreement without prior notice to you and at our
                sole discretion at any time by posting a new version to the Ananas website. Your
                continued access to or use of the Services and/or Software indicates your acceptance
                of the current published version of the Agreement.
              </div>

              <div>12. Force Majeure</div>

              <div>
                Ananas shall not be in breach of this Agreement nor liable for delay in performing,
                or failure to perform, any of its obligations under this Agreement if such delay or
                failure result from events, circumstances or causes beyond its reasonable control.
              </div>

              <div>13. Notifications</div>

              <div>
                13.1 TripAdvisor LLC dba Ananas does not accept legal notices or service of legal
                process by any means other than hard copy post delivered to TripAdvisor LLC, 400 1st
                Avenue, Needham, MA 02494, USA. For the avoidance of doubt and without limitation,
                TripAdvisor LLC therefore does not accept notices or legal service deposited upon
                any of its affiliates or subsidiaries.
              </div>

              <div>
                13.2 All other notifications given in connection with this Agreement may be in
                writing via email. Ananas’s email address is info@Ananas.is.
              </div>

              <div>14. Assignment and other Dealings</div>

              <div>
                14.1 Ananas may at any time assign, subcontract, delegate or deal in any other
                manner with any or all its rights and obligations related to the Services and this
                Agreement.
              </div>

              <div>
                14.2 You shall not assign, transfer, delegate or deal in any other manner with any
                of its rights and obligations related to the Services and this Agreement without the
                prior written consent of Ananas, to be given or withheld in Ananas's sole
                discretion.
              </div>

              <div>15. Governing Law and Jurisdiction</div>

              <div>
                15.1 This Agreement and any dispute or claim (including non-contractual disputes or
                claims) arising out of or in connection with it or its subject matter or formation
                shall be governed by and construed in accordance with the law of the Commonwealth of
                Massachusetts, USA. Subject to Section 15.2, each Party hereby consents to the
                exclusive jurisdiction and venue of courts in Massachusetts, USA and stipulates to
                the fairness and convenience of proceedings in such courts for all disputes, both
                contractual and non-contractual, arising out of or relating to the use of the
                Services. All claims against TripAdvisor LLC arising from or relating to the
                Services must be heard and resolved in a court of competent subject matter
                jurisdiction located in the Commonwealth of Massachusetts. Use of the Services is
                unauthorized in any jurisdiction that does not give effect to all provisions of
                these terms and conditions, including, without limitation, this section.
              </div>

              <div>
                15.2 Nothing in this Section 15 shall limit the right of TripAdvisor LLC to take
                proceedings against you in any other court, or courts, of competent jurisdiction.
                The foregoing shall not apply to the extent that applicable law in your country of
                residence requires application of another law and/or jurisdiction.
              </div>

              <div>DATA PROCESSING AGREEMENT</div>

              <div>BACKGROUND AND PURPOSE OF PROCESSING</div>
              <div>
                In relation to the Services, Ananas (the “Processor”) may process information and
                data, which can be considered Personal Data in the meaning of data protection
                legislation, i.e. Regulation 2016/679 of the European Parliament and of the Council
                of 27 April 2016 effective from 25 May 2018 (“Data Protection Legislation”), on
                behalf of the User (the “Controller”).
              </div>

              <div>
                Where the Processor processes such Personal Data on behalf of the Controller, the
                Processor is considered a data processor according to Data Protection Legislation,
                and the Controller a data controller.
              </div>

              <div>
                The purpose of this Data Processing Agreement is to regulate the Parties’ rights and
                obligations in relation to the Processor’s processing of Personal Data on behalf of
                the Controller, particularly to ensure the secure processing of the Personal Data
                and to fulfil the requirement of the Data Protection Legislation.
              </div>

              <div>
                15.2 PROCESSING OF PERSONAL DATA AND CATEGORIES OF PERSONAL DATA AND DATA SUBJECTS
              </div>

              <div>
                1.1 The Processor will process Personal Data related to the Controller’s business
                activities on behalf of the Controller (the “Data Subjects”).
              </div>

              <div>
                1.2 The Processor will process the personal data uploaded by the Controller on the
                Processor’s Software (the “Personal Data”). They may include e.g.:
              </div>

              <div>
                · Contact information · Travel arrangement information · Sensitive Personal Data,
                such as religious beliefs and health information.
              </div>

              <div>15.3 THE PROCESSOR’S OBLIGATIONS</div>

              <div>
                2.1 The Processor is only permitted to process Personal Data on behalf of the
                Controller in accordance with this Data Processing Agreement or in accordance with
                the Controller’s documented instructions, unless the Processor is authorized to do
                so by law.
              </div>

              <div>
                2.2 The Processor shall ensure that its employees, and others who have access to the
                Personal Data, only process the Personal Data according to the instructions given by
                the Controller.
              </div>

              <div>15.4 THE CONTROLLER'S OBLIGATIONS</div>

              <div>
                3.1 The Controller warrants that it has the right to process the Personal Data in
                question, and that it has the right to appoint the Processor to process the Personal
                Data on the Controller’s behalf.
              </div>

              <div>
                3.2 The Controller shall be responsible for notifying the processing activities to
                the applicable data protection authority and/or acquiring a permit for the
                processing, where applicable.
              </div>

              <div>15.5 CONFIDENTIALITY AND TRAINING OF EMPLOYEES</div>

              <div>
                The Processor shall ensure that all employees, and others who may have access to the
                Personal Data, have committed themselves to confidentiality about everything they
                learn of while processing Personal Data on behalf of the Controller.
              </div>

              <div>15.6 SECURITY MEASURES</div>

              <div>
                5.1 The Processor shall ensure that appropriate technical and organizational
                measures are implemented to ensure a level of security of the Personal Data
                processed on behalf of the Controller. The measures shall ensure a level of security
                appropriate to the risk, taking into account the state of the art, the cost of
                implementation and the nature, scope, context and purpose of processing as well as
                the risk of varying likelihood and severity for the rights and freedoms of natural
                persons.
              </div>

              <div>
                5.2 The Processor is responsible for ensuring that the technical and organizational
                measures adopted at all times are appropriate and sufficient.
              </div>

              <div>
                5.3 For the purposes of preventing and limiting damage caused by human error, theft,
                fraud and other abuse, the Processor will implement and maintain:
              </div>

              <div>
                · the ability to ensure the ongoing confidentiality, integrity, availability and
                resilience of processing systems and services; · the ability to restore the
                availability and access to Personal Data in a timely manner in the event of a
                physical or technical incident; and · a process for regularly testing, assessing and
                evaluating the effectiveness of technical and organizational measures for ensuring
                the security of processing.
              </div>

              <div>
                5.4 The Processor will limit the access to the Personal Data to only those who need
                it for the purpose of its duties according to this Data Processing Agreement.
              </div>

              <div>
                5.5 The Processor will ensure that all employees, who have access to the Personal
                Data from the Controller, have received appropriate training on the laws relating to
                the handling of Personal Data and are aware both of the Processors‘ duties, as well
                as their personal duties and obligations under Data Protection Legislation and this
                Data Processing Agreement.
              </div>

              <div>
                5.6 The Processor shall notify the Controller without undue delay after becoming
                aware of a Personal Data breach and shall take reasonable steps to mitigate the
                effects and to minimize any damage resulting from such breach. To assist the
                Controller in relation to any Personal Data breach notification the Controller is
                required to make under the relevant Data Protection Legislation, such a notification
                shall include information the Processor reasonably is able to disclose to the
                Controller, taking into account the nature of the service, the information available
                to the Processor and any restriction on disclosing the information, such as
                confidentiality.
              </div>

              <div>
                5.7 The Processor shall inform the Controller of where the Personal Data is stored
                upon request. The Processor may transfer Personal Data outside the European Economic
                Area, however only if such transfer is to an entity in a country that provides an
                adequate level of personal data protection within the meaning of Data Protection
                Legislation or the entity: (a) is part of the EU-U.S. Privacy Shield Framework; or
                (b) uses Standard Contractual Clauses adopted by the European Commission. If the
                mechanism used by the Parties for the transfer of Personal Data to third countries
                should become invalid, the Parties will promptly put in place an alternative
                mechanism for the transfer of Personal Data to third countries. Ananas primarily
                hosts the Personal Data at Amazon Web Services.
              </div>

              <div>15.7 INTERNAL AUDIT</div>

              <div>
                6.1 The Processor shall conduct an internal audit of the processing of Personal Data
                to make sure the Personal Data is processed in accordance with applicable law and
                that appropriate security measures have been implemented.
              </div>

              <div>
                6.2 The internal audit shall be conducted regularly. The frequency and scope of the
                audit shall be decided depending on the risk involved by the processing, the nature
                of the data being processed, the technique being used to ensure the security of the
                data and the cost of the audit. The audit shall be performed at the least once a
                year.
              </div>

              <div>
                6.3 The Processor shall prepare a report on the performance of the internal audit.
                The report shall describe the outcome of each element of the audit. The reports
                shall be securely stored.
              </div>

              <div>15.8 SUBPROCESSORS</div>

              <div>
                7.1 The Controller accepts the Processor’s use of sub-processors to perform specific
                processing activities according to this Data Processing Agreement. A list of the
                Processors sub-processors shall be available upon reasonable request. The Controller
                can always object to the use of sub-processors within 30 days from receipt of such
                list.
              </div>

              <div>
                7.2 The Processor shall impose materially the same data protection obligations as
                set out in this Data Processing Agreement and the Data Protection Legislation on any
                sub-processor.
              </div>

              <div>
                7.3 The Processor shall always remain fully liable to the Controller for the
                performance of the sub-processor’s obligations.
              </div>

              <div>15.9 DATA SUBJECT REQUESTS AND THIRD PARTY RIGHTS</div>

              <div>
                8.1 The Processor shall assist the Controller by appropriate technical and
                organizational measures, to the extent reasonable possible, to respond to requests
                for exercising any Data Subject’s rights in accordance with the Data Protection
                Legislation, e.g. access to Personal Data, rectification or erasure of data and
                portability of data. The same applies to any requests and enquiries by relevant
                supervisory authorities.
              </div>

              <div>
                8.2 The Processor shall refer any Data Subjects’ requests which relate to the
                Controller’s data to the Controller.
              </div>

              <div>15.10 DURATION OF DATA PROCESSING AGREEMENT</div>

              <div>
                The Data Processing Agreement shall be valid as long as the Agreement is in force.
              </div>

              <div>15.11 ERASURE OR RETURN OF PERSONAL DATA</div>

              <div>
                10.1 The Processor shall, in consult with the Controller, erase the Personal Data
                where the data is no longer necessary in relation to the purposes for which they
                were collected, unless otherwise required by law.
              </div>

              <div>
                10.2 The Controller can at any time instruct the Processor to erase or return
                Personal Data to the Controller. The Processor shall respond to such instructions as
                soon and to the extent reasonably possible.
              </div>

              <div>
                10.3 Upon the termination of this Data Processing Agreement the Processor shall, at
                the Controller’s choosing, erase or return all Personal Data it stores or has access
                to, to the Controller. The Processor shall also erase all copies of the Personal
                Data, unless the Processor is obligated by law to store the data.
              </div>

              <div>15.12 INDEMNITY AND COSTS</div>

              <div>
                11.1 Each Party will hold the other Party harmless of any claims, damages, penalties
                and any costs or fees, of whatever nature incurred by the Party or for which the
                Party may become liable due to any failure by the other Party or its employees or
                agents to comply with any of its obligations under this Data Processing Agreement or
                any Data Protection Legislation.
              </div>

              <div>
                11.2 The Controller shall indemnify and keep indemnified the Processor against all
                costs that relate to the Processor’s assistance to the Controller based on this Data
                Processing Agreement.
              </div>

              <div>15.13 ACCESS TO INFORMATION ON PROCESSING</div>

              <div>
                The Processor shall make available to the Controller all information necessary to
                demonstrate compliance with the obligations laid down by Data Protection Legislation
                and this Data Processing Agreement, upon request from the Controller.
              </div>

              <div>15.14 CONTACTS</div>

              <div>
                All notifications according to this Data Processing Agreement shall be done in
                writing via email. Ananas’s email address is agreement@hotelfacts.net
              </div>

              <div>15.15 OTHER</div>

              <div>
                14.1 This Data Processing Agreement shall prevail over other agreements in relation
                to the Processor’s processing of Personal Data on behalf of the Controller and other
                related obligations. Any other provisions of the Agreement shall remain in effect.
              </div>

              <div>
                14.2 The Processor confirms that it has the ability and competence to fulfil the
                obligations set out in this Data Processing Agreement.
              </div>
            </b-card>
            <b-button style="float: right" @click="userAgreed()" variant="success"
              >Agree and Confirm</b-button
            >
            <b-button variant="outline-danger" @click="cancelAgreement()">Camcel</b-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      registered: false,
      userAgreePop: false,
      newUser: {
        username: "",
        email: "",
        phone: "",
        accountType: null,
        firstName: "",
        lastName: "",
        password: "",
        rePassword: "",
        country: null,
        userAgree: false,
      },
      invalidEntry: {
        username: [],
        email: [],
        accountType: [],
        phone: [],
        firstName: [],
        lastName: [],
        country: [],
        password: [],
        rePassword: [],
        nonFieldErrors: [],
        userAgree: [],
      },
      countries: this.$store.getters["countriesStatic/getCountries"],
    };
  },
  computed: {},
  methods: {
    async signup() {
      if (this.isLoading) {
        return;
      }
      if (this.newUser.userAgree == false) {
        this.invalidEntry.userAgree = [
          "Terms & Conditions in User Agreement must be accepted to create an account.",
        ];
        this.$toast.error("Please read and accept the user agreement.");
        return;
      }
      this.isLoading = true;
      const requestBody = {
        username: this.newUser.username,
        phone: this.newUser.phone,
        account_type: this.newUser.accountType,
        first_name: this.newUser.firstName,
        last_name: this.newUser.lastName,
        country: this.newUser.country,
        email: this.newUser.email,
        password: this.newUser.password,
        re_password: this.newUser.rePassword,
        agreement: this.newUser.userAgree,
      };
      await this.$store
        .dispatch("user/register", requestBody)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.registered = true;
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          this.$toast.success("You're registered successfully. Please check your email.");
        })
        .catch((error) => {
          this.invalidEntry.username = error.username || [];
          this.invalidEntry.phone = error.phone || [];
          this.invalidEntry.accountType = error.accountType || [];
          this.invalidEntry.firstName = error.firstName || [];
          this.invalidEntry.lastName = error.lastName || [];
          this.invalidEntry.email = error.email || [];
          this.invalidEntry.password = error.password || [];
          this.invalidEntry.country = error.country || [];
          this.invalidEntry.nonFieldErrors =
            this.newUser.password === this.newUser.rePassword
              ? []
              : ["The two password fields didn't match."];
        });
      this.$toast.error("Something went wrong. Please fix the errors.");
      this.isLoading = false;
    },
    userAgreement() {
      this.userAgreePop = true;
    },
    userAgreed() {
      this.newUser.userAgree = true;
      this.invalidEntry.userAgree = [];
      this.userAgreePop = false;
    },
    cancelAgreement() {
      this.userAgreePop = false;
    },
  },
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 10px auto;
  /* border: 2px solid grey; */
  padding: 12px 30px 5px 30px;
  border-radius: 30px;
  -webkit-box-shadow: 0px 0px 23px -8px rgba(10, 10, 10, 1);
  -moz-box-shadow: 0px 0px 23px -8px rgba(10, 10, 10, 1);
  box-shadow: 0px 0px 23px -8px rgba(10, 10, 10, 1);
}

label {
  text-align: left !important;
  width: 100%;
}

li {
  margin: 0 auto 0 0;
  text-align: left !important;
}

.spinner-border {
  height: 1.5rem;
  width: 1.5rem;
}

.modal {
  max-height: 75% !important;
}
</style>
