import prompt from 'async-prompt';
import * as re from './lib.mjs';

function help() {
    console.log(`Commands:
  help, ?
    print help

  exit, quit, bye, ^C
    exit

  play <stream>
    play the stream in roon -- must be one of the Roon-supported stream formats

  stop
    stop playback and release the zone back to Roon

  vol up|down|<number>
    change the volume up or down, or set it to a specific number

`);
}

const pmpt = `\nEnter command (? for help) > `;

const logger = (msg) => {
    if (msg)
        process.stdout.write("\n" + msg + pmpt);
    process.stdout.write(pmpt);
}

const roon = re.init({
        logger: logger,
        enableProtocolTrace: false,
        extensionOptions: {
            extension_id:        'com.EpochAudio.connect_stream',
            display_name:        'Epoch Audio Connect Stream',
            display_version:     "1.0.0",
            publisher:           '门耳朵制作',
            email:               'sales@epochaudio.cn',
            website:             'http://www.epochaudio.cn',
        },
});

while (true) {
    const argv = (await prompt(pmpt))?.split(/\s\s*/);

    if (argv[0] == "") {
        // do nothing

    } else if (argv[0] == "exit" || argv[0] == "quit" || argv[0] == "bye") {
        process.exit(0);

    } else if (argv[0] == "?" || argv[0] == "help") {
        help();

    } else if (argv[0] == "stop") {
        re.stop();

    } else if (argv[0] == "play") {
        const url = argv[1];
        if (!url)
            console.log(`error: play <url>`);
        else
            re.play({
                    url: url,
                    name: "My Brand",
                    line1: "来自门耳朵的中文在线广播",
                    icon: "/image/qrcode_for_gh_75032b7b381b_344-300x300.jpg",
            });

    } else if (argv[0] == "vol") {
        if (argv[1] == "up") {
            const vol = parseInt(argv[2], 10) || 1;
            roon.core.services.RoonApiTransport.change_volume(roon.current_output_id, 'relative_step', vol);

        } else if (argv[1] == "down") {
            const vol = parseInt(argv[2], 10) || 1;
            roon.core.services.RoonApiTransport.change_volume(roon.current_output_id, 'relative_step', vol * -1);

        } else {
            const vol = parseInt(argv[1], 10);
            if (isNaN(vol))
                console.log(`error: vol up|down|<number>`);
            else
                roon.core.services.RoonApiTransport.change_volume(roon.current_output_id, 'absolute', vol);
        }

    } else {
        console.log(`error: unknown command: ${argv.join(" ")}`);
    }
}
