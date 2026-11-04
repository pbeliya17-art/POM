/*
testcase:Accountregistration
step1: Navigate to aplication url
step2: go to my account and click on register button
step3: Fill the registration form with random data
step4: Agree to privacy policy and submit the format
step5: validate the confirmation */
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import {RandomDataUtil} from '../utils/randomDataGenerator';
import {TestConfig} from '../test.config';
test('Accountregistration',async({page})=>{
    const config=new TestConfig();
    await page.goto(config.appUrl);//navigate the Url

    //go to my account and click on registration button
    const Homepage=new HomePage(page);
    await  Homepage.clickMyAccount();
    await  Homepage.clickRegister();

    //Fill the registration with random data
    const registrationpage=new RegistrationPage(page);
    await  registrationpage.setFirstName(RandomDataUtil.getFirstName());
    await  registrationpage.setLastName(RandomDataUtil.getlastName());
    await  registrationpage.setEmail(RandomDataUtil.getEmail());
    await  registrationpage.setTelephone(RandomDataUtil.getPhoneNumber());
    const password=RandomDataUtil.getPassword();
    await registrationpage.setPassword(password);
    await registrationpage.setConfirmPassword(password);
    await registrationpage.setPrivacyPolicy();
    await registrationpage.clickContinue();
    
    //validate the confirmation message
    const confirmation=await registrationpage.getConfirmationMsg();
    expect(confirmation).toContain('Your Account Has Been Created!')
    


    
});
