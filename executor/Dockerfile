FROM rust:alpine

ADD ./kencloud-executor /opt/kencloud-executor

RUN cargo install cargo-wasi &&\
    chmod +x /opt/kencloud-scheduler && \
    mkdir /lib64 && \
    ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2

CMD /opt/kencloud-executor