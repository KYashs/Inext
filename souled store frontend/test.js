const { Builder, By, until } = require('selenium-webdriver');

(async function testLogin() {
  // Step 1: Set up WebDriver
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Step 2: Navigate to the Login Page
    await driver.get('http://localhost:3000');

    // Step 3: Test Valid Login
    console.log("Testing valid login...");

    // Enter valid email or phone
    await driver.findElement(By.id('emailPhone')).sendKeys('y@gmail.com');
    // Enter valid password
    await driver.findElement(By.id('password')).sendKeys('y1234');
    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for redirection to /home for customer
    await driver.wait(until.urlIs('http://localhost:3000/home'), 5000);
    console.log("Customer login passed!");

    // Step 4: Test Invalid Login
    console.log("Testing invalid login...");
    await driver.get('http://localhost:3000'); // Navigate back to login page

    // Enter invalid email or phone
    await driver.findElement(By.id('emailPhone')).clear();
    await driver.findElement(By.id('emailPhone')).sendKeys('invalid-email@example.com');
    // Enter invalid password
    await driver.findElement(By.id('password')).clear();
    await driver.findElement(By.id('password')).sendKeys('wrongpassword');
    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for error message to appear
    const errorMessage = await driver.wait(
      until.elementLocated(By.css('.text-red-500')), // Class for the error message
      5000
    ).getText();

    if (errorMessage === 'Invalid credentials. Please try again.') {
      console.log("Invalid login handling passed!");
    } else {
      console.error("Unexpected error message!");
    }

    // Step 5: Test Admin Role Redirection
    console.log("Testing admin login...");
    await driver.get('http://localhost:3000'); // Navigate back to login page

    // Enter admin email or phone
    await driver.findElement(By.id('emailPhone')).clear();
    await driver.findElement(By.id('emailPhone')).sendKeys('yashwant@gmail.com');
    // Enter admin password
    await driver.findElement(By.id('password')).clear();
    await driver.findElement(By.id('password')).sendKeys('y1234');
    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for redirection to /adminhome
    await driver.wait(until.urlIs('http://localhost:3000/adminhome'), 5000);
    console.log("Admin login passed!");

  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    // Close the browser
    await driver.quit();
  }
})();



(async function testSignup() {
  // Step 1: Set up WebDriver
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Step 2: Navigate to the Signup Page
    await driver.get('http://localhost:3000/signup'); // Update to your signup page URL

    // Step 3: Test Successful Signup
    console.log("Testing successful signup...");
    
    // Enter email or phone
    await driver.findElement(By.id('emailPhone')).sendKeys('newuser@example.com');
    // Enter password
    await driver.findElement(By.id('password')).sendKeys('strongpassword');
    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for the success message
    const successMessage = await driver.wait(
      until.elementLocated(By.css('.text-green-500')), // Class for success message
      5000
    ).getText();

    if (successMessage === 'Account created successfully! You can now login.') {
      console.log("Successful signup test passed!");
    } else {
      console.error("Unexpected success message!");
    }

    // Step 4: Test Signup Failure
    console.log("Testing signup failure...");
    await driver.get('http://localhost:3000/signup'); // Reload the page

    // Enter email or phone
    await driver.findElement(By.id('emailPhone')).clear();
    await driver.findElement(By.id('emailPhone')).sendKeys('y@gmail.com');
    // Enter password
    await driver.findElement(By.id('password')).clear();
    await driver.findElement(By.id('password')).sendKeys('weakpassword');
    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for the error message
    const errorMessage = await driver.wait(
      until.elementLocated(By.css('.text-green-500')), // Assuming the same element updates
      5000
    ).getText();

    if (errorMessage === 'Error creating account. Please try again.') {
      console.log("Signup failure test passed!");
    } else {
      console.error("Unexpected error message!");
    }

    // Step 5: Test Field Validations
    console.log("Testing field validations...");
    await driver.get('http://localhost:3000/signup'); // Reload the page

    // Leave fields empty and submit
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Verify that required validation prevents submission
    const emailPhoneField = await driver.findElement(By.id('emailPhone')).getAttribute('validationMessage');
    const passwordField = await driver.findElement(By.id('password')).getAttribute('validationMessage');

    if (emailPhoneField || passwordField) {
      console.log("Field validation test passed!");
    } else {
      console.error("Field validation test failed!");
    }
  } catch (err) {
    console.error("Test failed!", err);
  } finally {
    // Close the browser
    await driver.quit();
  }
})();
