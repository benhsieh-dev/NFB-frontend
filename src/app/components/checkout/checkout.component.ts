import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { NFBFormService } from 'src/app/services/nfbform.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;

  shippingAddessStates: State[] = [];
  billingAddressStates: State[] = [];

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private nfbFormService: NFBFormService
  ) {}

  ngOnInit(): void {

    this.nfbFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data; 
      }
    )
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),

      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),

      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),

      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    const startMonth: number = new Date().getMonth() + 1;
    console.log(startMonth + 1);
    this.nfbFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Received credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    this.nfbFormService.getCreditCardYears().subscribe((data) => {
      console.log('Received credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });
  }

  onSubmit() {
    console.log('Handling the submit button');
    // console.log(this.checkoutFormGroup.get('customer').value);
    // console.log("The email addres is " + this.checkoutFormGroup.get('customer').value.email);

    console.log(
      'The country is ' + this.checkoutFormGroup.get('country').value
    );
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard'); 
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1; 
    }

    this.nfbFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code; 

    this.nfbFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddessStates = data;
        } else {
          this.billingAddressStates = data; 
        }
        formGroup.get('state').setValue(data[0]); 
      }
    )
  }
}
