 function getTime() {
    const start_h = document.getElementById("start_hour_pic");
    const start_m = document.getElementById("start_min_pic");
    const end_h = document.getElementById("end_hour_pic");
    const end_m = document.getElementById("end_min_pic");
    let time_st, time_end;
    let h_st, m_st, h_end, m_end;
    let smallest = 100;
    let t1, t2, t3, t4;

    try {
    for (const time_1 of start_h.children) {
        if (Math.abs(time_1.getBoundingClientRect().top - start_h.getBoundingClientRect().top) < smallest) {
            smallest = Math.abs(time_1.getBoundingClientRect().top - start_h.getBoundingClientRect().top);
            t1 = time_1.innerHTML;
            if(!isNaN(t1) && t1.trim() != '') {
                h_st = (Number(t1) + 1);
            }
            else {
                if (t1.trim() == '-') {
                    h_st = '0';
                }
                else {
                    h_st = '-';
                }
            }
        }
    }

    smallest = 100;

    for (const time_2 of start_m.children) {
        if (Math.abs(time_2.getBoundingClientRect().top - start_m.getBoundingClientRect().top) < smallest) {
            smallest = Math.abs(time_2.getBoundingClientRect().top - start_m.getBoundingClientRect().top);
            if(!isNaN(time_2.innerHTML) && time_2.innerHTML.trim() != '') {
                if (Number(time_2.innerHTML) < 9) {
                    m_st = '0';
                }
                else {
                    m_st = '';
                }
                m_st = m_st + (Number(time_2.innerHTML) + 1) + '';
            }
            else {
                if (time_2.innerHTML.trim() == '-') {
                    m_st = '00';
                }
                else {
                    m_st = '-';
                }
            }
        }
    }

    smallest = 100;

    for (const time_3 of end_h.children) {
        if (Math.abs(time_3.getBoundingClientRect().top - start_h.getBoundingClientRect().top) < smallest) {
            smallest = Math.abs(time_3.getBoundingClientRect().top - start_h.getBoundingClientRect().top);
            if(!isNaN(time_3.innerHTML) && time_3.innerHTML.trim() != '') {
                h_end = (Number(time_3.innerHTML) + 1) + '';
            }
            else {
                if (time_3.innerHTML.trim() == '-') {
                    h_end = '0';
                }
                else {
                    h_end = '-';
                }
            }
        }
    }

    smallest = 100;

    for (const time_4 of end_m.children) {
        if (Math.abs(time_4.getBoundingClientRect().top - start_m.getBoundingClientRect().top) < smallest) {
            smallest = Math.abs(time_4.getBoundingClientRect().top - start_m.getBoundingClientRect().top);
            if(!isNaN(time_4.innerHTML) && time_4.innerHTML.trim() != '') {
                if (Number(time_4.innerHTML) < 9) {
                    m_end ='0';
                }
                else {
                    m_end = '';
                }
                m_end = m_end + (Number(time_4.innerHTML) + 1);
            }
            else {
                if (time_4.innerHTML.trim() == '-') {
                    m_end = '00';
                }
                else {
                    m_end = '-';
                }
            }
        }
    }

    document.getElementById('time_hl1').value = h_st + ':' + m_st;
    document.getElementById('time_hl2').value =  h_end + ':' + m_end;
    }
    catch(err) {
        document.getElementById('time_hl1').value = err.message;
    }
 }

/*
 function getReq2() {
            console.log("getReq() called");
            const name = document.getElementById("name").value;
            const data = { name };
 
            fetch("http://localhost:3000/submit_new_event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error(error);
            });
        }
*/
