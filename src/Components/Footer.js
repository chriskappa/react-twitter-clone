import React from 'react'

export default function Footer() {
    return (
        <div class="w-100 text-center mt-5 align-items-center justify-content-center">
            <footer class="footer mt-auto py-3 bg-light ">
                <div class="container">
                    <span class=" font-weight-bold">Made With <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" width="50"alt="" /> And &nbsp; <img src="https://help.iubenda.com/wp-content/uploads/2020/05/firebase-1024x293.png" width="100"alt="" /> &nbsp; By Christos </span>
                </div>
                <hr/>
                <div className="social-media">
                    <ul class="d-flex flex-row  ">
                       <a href="https://github.com/chriskappa" target="_blank"><li title="Check my GitHub Page :)"> GitHub</li></a>
                        <li>Facebook</li>
                        <li>Twitter</li>
                    </ul>
                </div>
            </footer>

        </div>
    )
}
