const LogInForm = () => {
  return (
    <form>
        <label htmlFor="email" name="email" id="email">Email Address:</label><br />
        <input type="email" id="email" required/><br />
        <label htmlFor="password" id="password" name="password">Password:</label><br />
        <input type="password" id="password" name="password" required/><br />
        <input type="submit" value="Login"/><br />
    </form>
  )
}

export default LogInForm